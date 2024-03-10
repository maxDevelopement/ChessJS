// requests
import subscribeRequest from "./requests/subscribeRequest.js"
import loginRequest from "./requests/loginRequest.js"
import searchOpponentRequest from "./requests/searchOpponentRequest.js"
import getAllGamesRequest from "./requests/getAllGamesRequest.js"
//import startNewGame from "./gameGestion.js"
// classes
import User from "../publicClasses/user.js"
import userInGame from "../publicClasses/userInGame.js"
import UserInGame from "../publicClasses/userInGame.js"

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
const btCancelChessBoard = $('#btCancelChessBoard')
const btCancelCreateGame = $('#btCancelCreateGame')
const inputUsernameOpponent = $('#inputUsernameOpponent')
const btSearchOpponent = $('#btSearchOpponent')
let showUsernameOpponent = $('#showUsernameOpponent')
let searchedOpponent
const btSendCreateGame = $('#btSendCreateGame')
// continue game
const continueGameForm = $('#continueGameForm')
const btOpenContinueGameForm = $('#btOpenContinueGameForm')
const btCancelContinueGame = $('#btCancelContinueGame')
const allGamesContainer = $('#allGamesContainer')
// game
const chessBoardContainer = $('#chessBoardContainer')
let chessBoard
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
btCancelChessBoard.on('click', () => {
    console.log("click")
    closeDiv(chessBoard)
    openDiv(homePageUserConnected, "flex")
})
btSearchOpponent.on('click', async () => {
    const usernameToSearch = inputUsernameOpponent.val()
    const myUsername = (await getUser()).username
    console.log("myUsername : ", myUsername)
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
    //console.log("color creator : ", colorCreator, ", idOpponent : ", searchedOpponent.idUser)
    const actualUser = await getUser()
    if(actualUser){
        const user = await getUser()
        const newGame = await actualUser.createNewGame(searchedOpponent.idUser, colorCreator)
        if(newGame.done){
            console.log("new game : ", newGame)
            openExistentGame(newGame, user)
        }
    }   
    closeDiv(createGameForm)
    openDiv(chessBoardContainer, 'block') 
})
// CONTINUE GAME FORM
btOpenContinueGameForm.on('click', async () => {
    openDiv(continueGameForm, 'flex')
    closeDiv(homePageUserConnected)
    const user = await getUser()
    console.log("all games of user : ", user)
    const allGamesArray = user.allGames
    allGamesContainer.empty()
    allGamesArray.forEach((game) => {
        showThisGameToContinue(game, user)
    })
})
btCancelContinueGame.on('click', () => {
    openDiv(homePageUserConnected, "flex")
    closeDiv(continueGameForm)
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
function changeBorderColor(input, color){
    input.css({
        "borderColor": color
    })
}
// fonction qui ouvre le menu principale une fois le user connecté
async function openConnexion(user){
    openDiv(homePageUserConnected, "flex")
    closeDiv(loginForm)
    closeDiv(subscribeForm)
    const actualUser = new User(user.idUser, user.username)  
    sessionStorage.setItem("user", JSON.stringify(actualUser))
}
async function getUser(){
    const stockedUser = JSON.parse(sessionStorage.getItem("user"))
    const allGames = (await getAllGamesRequest(stockedUser.idUser)).allGames
    const actualUser = new User(stockedUser.idUser, stockedUser.username, allGames)
    if(!stockedUser){
        return false
    }
    return actualUser
}
function showThisGameToContinue(data, user){
    if(data.finished === false || data.finished === null){
        const newDiv = $('<input>', {
            type: 'submit',
            class: 'continueGameBt',
            value: `${data.opponentUsername} : ${data.createdAt}`,
            click: () => openExistentGame(data, user)
        })
        allGamesContainer.append(newDiv)
    }
}
async function openNewGame(){
    openDiv(chessBoardContainer, 'block')
    closeDiv(createGameForm)
    closeDiv(continueGameForm)
}
async function openExistentGame(newGame, user){
    console.log("OPEN GAME : ", newGame)
    const game = new UserInGame(user.idUser, newGame.idGame, newGame.actualBoard, newGame.userColor, newGame.opponentUsername)
    user.actualGame = game
    console.log("ACTUAL GAME : ", user.actualGame)
    sessionStorage.setItem("user", JSON.stringify(user))
    $(document).trigger('chessBoardInsertion')
    openDiv(chessBoardContainer, 'block')
    closeDiv(createGameForm)
    closeDiv(continueGameForm)


    /*
    console.log("existent game : ", newGame)
    openDiv(chessBoardContainer, 'block')
    closeDiv(createGameForm)
    closeDiv(continueGameForm)
    const user = await getUser()
    const game = user.continueGame(newGame)
    const actualGame = new UserInGame(user.idUser, game.idGame, game.actualBoard, game.userColor, game.opponentUsername)
    user.actualGame = actualGame
    console.log("ACTUAL GAME : ", user.actualGame)
    sessionStorage.setItem("user", JSON.stringify(user))
    $(document).trigger('chessBoardInsertion')*/
}