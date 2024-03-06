const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    'chessadmin_chess',
    'chessadmin_app',
    'Salutsalut44@', {
        host: '657371.web24.swisscenter.com',
        dialect: 'mariadb',
        dialectOptions: {
            timeZone: 'Etc/GMT-2'
        },
        logging: false
    }
)
module.exports = { sequelize }