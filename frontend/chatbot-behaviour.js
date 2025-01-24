function getFileIndex() {
    const fileIndex = document.querySelector(
        'div > div > div.relative.z-10 > div.fixed.inset-0.z-10.overflow-y-auto > div > div > div > pre > span:nth-child(7)'
    )

    if (fileIndex) {
        return fileIndex.textContent.trim().replace(/"/g, '')
    } else {
        return 'Element not found'
    }
}

function getPageNumber() {
    for (let i = 11; i <= 20; i++) {
        const currentElement = document.querySelector(
            `div > div > div.relative.z-10 > div.fixed.inset-0.z-10.overflow-y-auto > div > div > div > pre > span:nth-child(${i})`
        )

        const previousElement = currentElement?.previousElementSibling

        if (previousElement && previousElement.textContent.includes('pageNumber')) {
            return currentElement.textContent.trim()
        }
    }
}

function sourceButtonBehaviour() {
    const observeSourceButtons = new MutationObserver(() => {
        const sourceButtonsContainer = document.querySelector('div.chatbot-chat-view')

        if (sourceButtonsContainer) {
            const messageDivs = sourceButtonsContainer.querySelectorAll(
                'div > div > div > div > div.overflow-y-scroll.flex.flex-col.flex-grow.min-w-full.w-full.px-3.pt-\\[70px\\].relative.scrollable-container.chatbot-chat-view.scroll-smooth > div'
            )

            messageDivs.forEach((messageDiv) => {
                const sourceButtons = messageDiv.querySelectorAll('span.chatbot-host-bubble[data-testid="host-bubble"]')

                let messageSourceCount = 1

                sourceButtons.forEach((button) => {
                    if (!button.classList.contains('prose') && !button.classList.contains('custom-listener')) {
                        button.textContent = `Source ${messageSourceCount}`
                        button.classList.add('custom-listener')

                        handleButtonClick(button)

                        const initialFileIndex = getFileIndex()
                        button.fileIndex = initialFileIndex

                        messageSourceCount++
                    }
                })
            })
        }
    })

    observeSourceButtons.observe(document.body, {
        childList: true,
        subtree: true
    })

    const observeAndHideElement = (callback) => {
        const observer = new MutationObserver((mutationsList, obs) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const targetElement = document.querySelector(
                        'div > div > div.relative.z-10 > div.fixed.inset-0.z-10.overflow-y-auto > div > div'
                    )
                    const targetElement2 = document.querySelector(
                        'div > div > div.relative.z-10 > div.fixed.inset-0.bg-black.bg-opacity-50.transition-opacity.animate-fade-in'
                    )

                    if (targetElement) {
                        const extractedData = targetElement.textContent

                        if (callback) callback(extractedData)

                        targetElement.style.display = 'none'
                        targetElement2.style.display = 'none'

                        const chatWindowElement = document.querySelector('div > div.fixed.inset-0.z-10.overflow-y-auto > div')

                        if (chatWindowElement) {
                            chatWindowElement.focus?.()
                            const simulateClick = () => {
                                const simulatedClick = new MouseEvent('click', {
                                    bubbles: true,
                                    cancelable: true,
                                    view: window
                                })
                                chatWindowElement.dispatchEvent(simulatedClick)
                            }
                            setTimeout(simulateClick, 100)
                        } else {
                            console.warn('Chat window element not found.')
                        }

                        obs.disconnect()
                        break
                    }
                }
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true
        })
    }

    document.body.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('span.chatbot-host-bubble[data-testid="host-bubble"]')
        if (clickedButton) {
            observeAndHideElement()
        }
    })
}

function handleButtonClick(button) {
    button.addEventListener('click', () => {
        setTimeout(() => {
            const fileIndex = getFileIndex()
            const pageNumber = getPageNumber()
            button.fileIndex = fileIndex
            console.log(fileIndex)
            console.log(pageNumber)
            loadPDF(fileIndex, pageNumber)
        })
    })
}

async function renderPage(pageNumber, pdf, canvas, ctx, totalPages, pageInfo) {
    if (isRendering) return
    isRendering = true

    try {
        if (currentRenderTask) {
            currentRenderTask.cancel()
        }

        const page = await pdf.getPage(pageNumber)
        const viewport = page.getViewport({ scale: 1.5 })
        canvas.width = viewport.width
        canvas.height = viewport.height

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        }

        currentRenderTask = page.render(renderContext)
        await currentRenderTask.promise

        pageInfo.textContent = `Page ${pageNumber} of ${totalPages}`
    } catch (renderError) {
        console.error('Error during page rendering:', renderError)
    } finally {
        isRendering = false
    }
}

async function loadPDF(fileIndex, pageNumber) {
    if (!fileIndex || fileIndex === 'Element not found') {
        console.error('Error: fileIndex is invalid or missing.')
        return
    }

    const pdfPath = `source-docs/${fileIndex}.pdf`
    const canvas = document.getElementById('pdf-canvas')
    const ctx = canvas.getContext('2d')
    const documentTitle = document.getElementById('document-title')
    const pageInfo = document.getElementById('page-info')
    const prevPageButton = document.getElementById('prev-page')
    const nextPageButton = document.getElementById('next-page')

    currentRenderTask = null
    isRendering = false
    currentPage = parseInt(pageNumber) || 1
    totalPages = 0
    pageInfo.textContent = ''

    documentTitle.textContent = fileIndex

    const oldPrevButton = prevPageButton.cloneNode(true)
    const oldNextButton = nextPageButton.cloneNode(true)
    prevPageButton.replaceWith(oldPrevButton)
    nextPageButton.replaceWith(oldNextButton)

    const newPrevPageButton = document.getElementById('prev-page')
    const newNextPageButton = document.getElementById('next-page')

    try {
        const pdf = await pdfjsLib.getDocument(pdfPath).promise
        totalPages = pdf.numPages

        // Button Listeners
        newPrevPageButton.addEventListener('click', async () => {
            if (isRendering || currentPage <= 1) return
            currentPage -= 1
            await renderPage(currentPage, pdf, canvas, ctx, totalPages, pageInfo)
        })

        newNextPageButton.addEventListener('click', async () => {
            if (isRendering || currentPage >= totalPages) return
            currentPage += 1
            await renderPage(currentPage, pdf, canvas, ctx, totalPages, pageInfo)
        })

        canvas.addEventListener('wheel', async (event) => {
            if (isRendering || !isCanvasInView(canvas)) return
            event.preventDefault()

            if (event.deltaY > 0) {
                if (currentPage < totalPages) {
                    newNextPageButton.click()
                }
            } else if (event.deltaY < 0) {
                if (currentPage > 1) {
                    newPrevPageButton.click()
                }
            }
        })

        await renderPage(currentPage, pdf, canvas, ctx, totalPages, pageInfo)

        handleFullscreenButton()
    } catch (error) {
        console.error('Error loading or rendering the PDF:', error)
    }
}

function isCanvasInView(canvas) {
    const rect = canvas.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

function handleFullscreenButton() {
    const fullscreenButton = document.getElementById('fullscreen-btn')

    fullscreenButton.addEventListener('click', () => {
        const currentPage = parseInt(document.getElementById('page-info').textContent.match(/\d+/)[0])
        const currentDoc = document.getElementById('document-title').textContent

        const pdfPath = `source-docs/${currentDoc}.pdf`
        const newTab = window.open('', '_blank')

        newTab.document.write(`
      <html>
        <head>
          <title>${currentDoc}</title>
        </head>
        <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
          <embed id="pdfEmbedder" 
                 src="${pdfPath}#page=${currentPage || 1}" 
                 type="application/pdf" 
                 width="100%" height="100%">
        </body>
      </html>
    `)

        newTab.focus()
    })
}

function hideCloseButton() {
    const observer = new MutationObserver(() => {
        const buttonElement = document.querySelector('#chatbot > div > div > button')
        if (buttonElement) {
            buttonElement.style.display = 'none'
            observer.disconnect()
        }
    })

    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
}

hideCloseButton()
sourceButtonBehaviour()
