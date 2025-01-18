import Chatbot from 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js'
const chatbotContainer = document.getElementById('chatbot')
const containerWidth = chatbotContainer.clientWidth - 10
// const containerHeight = chatbotContainer.clientHeight + 40
// const allSourceDocuments = new Set()

// Chatbot

Chatbot.init({
    chatflowid: 'a27705bb-92a5-401b-9277-dd0342d80c79',
    apiHost: 'http://localhost:3000',
    chatflowConfig: {
        // Optional configuration
        // topK: 2
    },
    observersConfig: {
        // Executes code in parent based on signal observations within the chatbot.
        observeUserInput: (userInput) => {
            console.log({ userInput })
        },
        observeMessages: (messages) => {
            console.log({ messages })
        },
        observeLoading: (loading) => {
            console.log({ loading })
        }
    },
    theme: {
        button: {
            backgroundColor: '#868686',
            right: 10,
            bottom: 0,
            size: 0.001, // Options: small | medium | large | number
            dragAndDrop: false,
            iconColor: 'white',
            customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
            autoWindowOpen: {
                autoOpen: true,
                openDelay: 0,
                autoOpenOnMobile: false
            }
        },
        tooltip: {
            showTooltip: false,
            tooltipMessage: 'Hi There 👋!',
            tooltipBackgroundColor: 'black',
            tooltipTextColor: 'white',
            tooltipFontSize: 0
        },
        chatWindow: {
            showTitle: false,
            showAgentMessages: true,
            title: 'ArchiChat Bot',
            titleAvatarSrc: 'img/logo-white-plain.svg',
            welcomeMessage: 'Hello! How can I assist you today?',
            errorMessage: 'This is a custom error message',
            backgroundColor: '#fff',
            backgroundImage: 'enter image path or link',
            height: 800,
            width: containerWidth,
            fontSize: 16,
            starterPrompts: ['What is a bot?', 'Who are you?'],
            starterPromptFontSize: 15,
            clearChatOnReload: false,
            sourceDocsTitle: 'Sources:',
            renderHTML: true,
            botMessage: {
                backgroundColor: '#f7f8ff',
                textColor: '#303235',
                showAvatar: true,
                avatarSrc: 'img/robot.svg'
            },
            userMessage: {
                backgroundColor: '#3B81F6',
                textColor: '#ffffff',
                showAvatar: true,
                avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
            },
            textInput: {
                placeholder: 'Type your question',
                backgroundColor: '#ffffff',
                textColor: '#303235',
                sendButtonColor: '#3B81F6',
                maxChars: 100,
                maxCharsWarningMessage: 'You exceeded the character limit. Please input less than 50 characters.',
                autoFocus: false,
                sendMessageSound: false,
                receiveMessageSound: false
            },
            feedback: {
                color: '#303235'
            },
            dateTimeToggle: {
                date: true,
                time: true
            },
            footer: {
                textColor: '#303235',
                text: 'Powered by',
                company: 'ArchiChat',
                companyLink: 'https://flowiseai.com'
            },
            disclaimer: {
                title: 'Disclaimer',
                message:
                    'By using this chatbot, you agree to the <a target="_blank" href="https://flowiseai.com/terms">Terms & Condition</a>'
            }
        }
    }
})

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js'
