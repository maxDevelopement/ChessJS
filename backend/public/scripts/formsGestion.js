// requests
import subscribeRequest from "./requests/subscribeRequest.js"
import loginRequest from "./requests/loginRequest.js"
import searchOpponentRequest from "./requests/searchOpponentRequest.js"
// classes
import User from "../publicClasses/user.js"
import createNewGameRequest from "./requests/createNewGameRequest.js"

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
        changeBorderColor(inputUsernameOpponent, "red")
        showUsernameOpponent.empty()
        return
    }
    const userExist = await searchOpponentRequest(usernameToSearch)
    if(!userExist.found){
        changeBorderColor(inputUsernameOpponent, "red")
        showUsernameOpponent.empty()
        return
    }
    const opponent = userExist.user
    searchedOpponent = opponent
    const showName = $('<h3>', {
        id: 'searchedOpponent',
        text: opponent.username
    })
    showUsernameOpponent.empty()
    showUsernameOpponent.append(showName)
    changeBorderColor(inputUsernameOpponent, "green")
})
btSendCreateGame.on('click', async () => {
    if(!searchedOpponent){
        changeBorderColor(inputUsernameOpponent, "red")
        return
    }
    const colorCreator = $('input[name=radioChooseYourColor]:checked').val()
    console.log("color creator : ", colorCreator, ", idOpponent : ", searchedOpponent.idUser)
    const actualUser = await getUser()
    if(actualUser){
        const newGame = await actualUser.createNewGame(searchedOpponent.idUser, colorCreator)
        if(newGame.done){
            closeDiv(createGameForm)
            openDiv(chessBoardContainer, 'block')
        }
    }    
})
// GAME GESTION 


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
function changeBorderColor(input, color){
    input.css({
        "borderColor": color
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
    const stockedUser = JSON.parse(sessionStorage.getItem("user"))
    const actualUser = new User(stockedUser.idUser, stockedUser.username)
    if(!stockedUser){
        return false
    }
    return actualUser
}
