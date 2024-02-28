// requests
import subscribeRequest from "./requests/subscribeRequest.js"
import loginRequest from "./requests/loginRequest.js"
import searchOpponentRequest from "./requests/searchOpponentRequest.js"
// classes
import User from "../publicClasses/user.js"

const homePageConnexionBt = $('#homePageConnexionBt')
// login
const btOpenLoginForm = $('#btOpenLoginForm')
const inputCancelLogin = $('#inputCancelLogin')
const inputSendLogin = $('#inputSendLogin')
const loginForm = $('#loginForm')
const inputUsernameLogin = $('#inputUsernameLogin')
const inputPasswordLogin = $('#inputPasswordLogin')
// subscribe
const btOpenSubscribeForm = $('#btOpenSubscribeForm')
const inputCancelSubscribe = $('#inputCancelSubscribe')
const inputSendSubscribe = $('#inputSendSubscribe')
const subscribeForm = $('#subscribeForm')
const inputUsernameSubscribe = $('#inputUsernameSubscribe')
const inputPassword1Subscribe = $('#inputPassword1Subscribe')
const inputPassword2Subscribe = $('#inputPassword2Subscribe')
// homepage
const homePageUserConnected = $('#homePageUserConnected')
// create game
const createGameForm = $('#createGameForm')
const btOpenCreateGameForm = $('#btOpenCreateGameForm')
const btCancelCreateGame = $('#btCancelCreateGame')
const inputUsernameOpponent = $('#inputUsernameOpponent')
const btSearchOpponent = $('#btSearchOpponent')
let showUsernameOpponent = $('#showUsernameOpponent')
let searchedOpponent
const btSendCreateGame = $('#btSendCreateGame')
// game
const chessBoardContainer = $('#chessBoardContainer')
// ------------------------------------------------
// EVENTS
// ------------------------------------------------

$(window).on("load", function(event) {   
    const userConnected = JSON.parse(sessionStorage.getItem("user"))
    if(!userConnected){
        console.log("user non connecté ")
        openDiv(homePageConnexionBt, 'flex')
        return
    }
    openConnexion(userConnected)
})

// SUBSCRIBTION REQUEST
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
    const response = await subscribeRequest(username, password1)
    if(response.auth){   
        openConnexion(response.user)
    }
})
btOpenSubscribeForm.on('click', () => {
    closeDiv(homePageConnexionBt)
    openDiv(subscribeForm, 'flex')
})
inputCancelSubscribe.on('click', () => {
    closeDiv(subscribeForm)
    openDiv(homePageConnexionBt, 'flex')
})
// LOGIN 
inputSendLogin.on('click', async() => {
    console.log("click")
    const username = inputUsernameLogin.val()
    const password = inputPasswordLogin.val()
    console.log(username, password)
    if(!username || !password){
        if(!username){
            console.log("no")
            inputUsernameLogin.css({'borderColor': 'red'})
        }
        if(!password){
            inputPasswordLogin.css({'borderColor': 'red'})
        }
        return
    }
    console.log("yes")
    const response = await loginRequest(username, password)
    if(response.auth){
        openConnexion(response.user)
    }
})
btOpenLoginForm.on('click', () => {
    closeDiv(homePageConnexionBt)
    openDiv(loginForm, 'flex')
})

inputCancelLogin.on('click', () => {
    closeDiv(loginForm)
    openDiv(homePageConnexionBt, 'flex')
})
// CREATE GAME
btOpenCreateGameForm.on('click', () => {
    closeDiv(homePageUserConnected)
    showUsernameOpponent.innerHTML = ''
    openDiv(createGameForm, 'block')
})
btCancelCreateGame.on('click', () => {
    closeDiv(createGameForm)
    openDiv(homePageUserConnected, "flex")
})
btSearchOpponent.on('click', async () => {
    const usernameToSearch = inputUsernameOpponent.val()
    const myUsername = getUser().username
    if(!usernameToSearch || usernameToSearch === myUsername){
        inputUsernameOpponent.css({
            "borderColor": "red"
        })
        return
    }
    const userExist = await searchOpponentRequest(usernameToSearch)
    if(!userExist.found){
        inputUsernameOpponent.css({
            "borderColor": "red"
        })
        return
    }
    const username = userExist.user.username
    searchedOpponent = username
    const showName = $('<h3>', {
        id: 'searchedOpponent',
        text: username
    })
    showUsernameOpponent.empty()
    showUsernameOpponent.append(showName)
})
btSendCreateGame.on('click', () => {
    if(!searchedOpponent){

    }
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
// fonction qui ouvre le menu principale une fois le user connecté
function openConnexion(user){
    openDiv(homePageUserConnected, "flex")
    closeDiv(loginForm)
    closeDiv(subscribeForm)
    const actualUser = new User(user.idUser, user.username)  
    console.log(actualUser)
    sessionStorage.setItem("user", JSON.stringify(actualUser))
}
function getUser(){
    const actualUser = JSON.parse(sessionStorage.getItem("user"))
    if(!actualUser){
        return false
    }
    return actualUser
}
