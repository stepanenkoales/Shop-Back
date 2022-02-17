const sequelize = require('../')

const User = require('./user')(sequelize)
const Category = require('./category')(sequelize)
const Item = require('./item')(sequelize, Category)
const Order = require('./order')(sequelize, User)
const OrderItem = require('./orderItem')(sequelize, Order, Item)

module.exports = {
  User,
  Category,
  Item,
  Order,
  OrderItem,
}
