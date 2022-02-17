const Sequelize = require('sequelize')
const config = require('../config')

const sequelize = new Sequelize(
  config.db,
  config.dbUsername,
  config.dbPassword,
  {
    dialect: 'postgres',
    host: config.dbHost,
    logging: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
)

sequelize.sync({ force: true })

module.exports = sequelize
