const bcrypt = require('bcrypt')
const { findUserByUsername } = require('./scripts/functions')

// ce endpoint attend 2 parametres : pseudo & password
module.exports = (app) => {
    app.post('/api/loginUser', async (req, res) => {
        //console.log("loginUser enter")
        const username = req.body.username
        const password = req.body.password
        try{
            // requete qui va chercher l'utilisateur (son pseudo)
            const userData = await findUserByUsername(username)
            //console.log(userData)
            if(userData === null){ // si il ne trouve rien 
                const message = "user n'existe pas"
                return res.json({msg: message, auth: false}) 
            }
            // si il trouve le user, compare les passwords 
            //console.log(password, " , ", userData.password)
            const isPasswordValid = await bcrypt.compare(password, userData.password)
            // si passwords ne correspondent pas
            if(!isPasswordValid){
                const message = "password incorrect"
                return res.json({msg: message, auth: false})
            }
            // si passwords correspondent => user connecté !
            const message = "user identifié avec succès"
            const user = { idUser: userData.idUser, username: userData.username }
            //console.log("user identifié : ", user)
            return res.status(200).json({msg: message, auth: true, user: user})
        }catch(error){
            console.error(error)
        }
    })
}