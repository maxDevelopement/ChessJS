import subscribeRequest from "./requests.js"
//const subscribeRequest = require('./requests')

const homePageConnexionBt = $('#homePageConnexionBt')

const btOpenLoginForm = $('#btOpenLoginForm')
const inputCancelLogin = $('#inputCancelLogin')
const loginForm = $('#loginForm')

const btOpenSubscribeForm = $('#btOpenSubscribeForm')
const inputCancelSubscribe = $('#inputCancelSubscribe')
const inputSendSubscribe = $('#inputSendSubscribe')
const subscribeForm = $('#subscribeForm')
const inputUsernameSubscribe = $('#inputUsernameSubscribe')
const inputPassword1Subscribe = $('#inputPassword1Subscribe')
const inputPassword2Subscribe = $('#inputPassword2Subscribe')


const chessBoardContainer = $('#chessBoardContainer')
// ------------------------------------------------
// EVENTS
// ------------------------------------------------

$(window).on("load", function(event) {   
    const userConnected = JSON.parse(localStorage.getItem("user"))
    if(!userConnected){
        openDiv(homePageConnexionBt, 'flex')
    }
})
btOpenLoginForm.on('click', () => {
    closeDiv(homePageConnexionBt)
    openDiv(loginForm, 'flex')
})
btOpenSubscribeForm.on('click', () => {
    closeDiv(homePageConnexionBt)
    openDiv(subscribeForm, 'flex')
})
inputCancelLogin.on('click', () => {
    closeDiv(loginForm)
    openDiv(homePageConnexionBt, 'flex')
})
inputCancelSubscribe.on('click', () => {
    closeDiv(subscribeForm)
    openDiv(homePageConnexionBt, 'flex')
})
inputSendSubscribe.on('click', async () => {
    const username = inputUsernameSubscribe.val()
    const password1 = inputPassword1Subscribe.val()
    const password2 = inputPassword2Subscribe.val()
    if(username && password1 && password2){
        if(password1 !== password2){
            // MOTS DE PASSES NE CONCORDENT PAS
            return
        }
    }
    const tryUser = await subscribeRequest(username, password1)
    console.log(tryUser)
})
// ------------------------------------------------
// FUNCTIONS
// ------------------------------------------------
function openDiv(div, display){
    div.css({
        'display': display
    })
}
function closeDiv(div){
    div.css({
        'display': 'none'
    })
}
