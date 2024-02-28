const User = require('../../models/users')

async function findUserById(id){
    const user = await User.findOne({where: {idUser: id}})
    if(!user){
        return false
    }
    console.log("user : ", user)
    return user.dataValues
}
async function findUserByUsername(username){
    const user = await User.findOne({where: {username: username}})
    if(!user){
        return false
    }
    console.log("user : ", user.dataValues)
    return user.dataValues
}

module.exports = { findUserById, findUserByUsername }