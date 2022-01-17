const sequelize = require('../')

const User = require('./user')(sequelize)

module.exports = {
  User,
}
