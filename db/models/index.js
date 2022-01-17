const sequelize = require('../')

const User = require('./user')(sequelize)
const Category = require('./category')(sequelize)
const Item = require('./item')(sequelize, Category)

module.exports = {
  User,
  Category,
  Item,
}
