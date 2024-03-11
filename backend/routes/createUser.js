const User = require('../models/users')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.post('/api/createUser', function (req, res){
        //console.log("enter createUser")
        //console.log("req.body : ", req.body)
        const username = req.body.username
        const Password = req.body.password
        if(username && Password){
            //console.log("enter hash")
            bcrypt.hash(Password, 10) // hashage du mot de passe
            .then(async (hash) => {
                //console.log(username, hash)
                let userData = undefined;
                try{
                    userData = await User.create({ // insertion dans la db
                        username: username,
                        password: hash
                    })
                }catch(error){
                    //console.log("erreur : ", error)
                    return res.json({insert: false}) // si un compte est deja lié à l'email que le user a mis
                } 
                //console.log("userData : ", userData)
                const message = "user créé avec succès"
                const userDataToSend = { idUser: userData.idUser, username: userData.username }
                res.json({msg: message, user: userDataToSend, auth: true})                            
            })             
        }
    })
}