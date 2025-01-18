// Buttons
const star = document.getElementById('star')
const saveChat = document.getElementById('saveChatContainer')

saveChat.addEventListener('mouseover', (event) => {
    event.stopPropagation()
    star.src = 'img/saved-fill.svg'
    star.classList.remove('empty')
    star.classList.add('saved')
})

saveChat.addEventListener('mouseleave', (event) => {
    event.stopPropagation()
    star.src = 'img/saved.svg'
    star.classList.remove('saved')
    star.classList.add('empty')
})
