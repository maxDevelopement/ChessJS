const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    'chessjs',
    'root',
    '', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timeZone: 'Etc/GMT-2'
        },
        logging: false
    }
)
module.exports = { sequelize }