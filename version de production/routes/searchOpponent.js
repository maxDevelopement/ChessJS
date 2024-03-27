const bcrypt = require('bcrypt')
const { findUserByUsername } = require('./scripts/functions')

// ce endpoint attend 2 parametres : pseudo & password
module.exports = (app) => {
    app.get('/api/searchOpponent', async (req, res) => {
        const opponentUsernameSearched = req.query.usernameToSearch
        //console.log(opponentUsernameSearched)
        const userExist = await findUserByUsername(opponentUsernameSearched)
        if(!userExist){
            //console.log("user existe pas")
            return res.json({found: false})
        }
        //console.log("user exist : ", userExist)
        const data = {idUser: userExist.idUser, username: userExist.username}
        return res.json({found: true, user: data})
    })
}