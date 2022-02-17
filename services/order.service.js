const { Op } = require('sequelize')
const { Order, OrderItem, Item } = require('../db/models')

class OrderService {
  getSearchProps(userId, { time, status }) {
    if (userId && time) {
      return {
        where: {
          userId,
          createdAt: { [Op.gt]: new Date(Date.now() - time) },
        },
        include: Item,
        //order: [Order, 'createdAt', 'DESC'],
      }
    }

    if (userId) {
      return {
        where: {
          userId,
        },
        include: Item,
      }
    }
  }

  async findOrders(userId, { time, status }) {
    const orders = await Order.findAll(
      this.getSearchProps(userId, { time, status })
    )
    return orders
  }

  async addOrder(userId, body, value) {
    const order = await Order.create({
      userId,
      address: value.address,
      comments: value.comments,
    })
    body.forEach((item) => (item.orderId = order.id))
    const orderItems = await OrderItem.bulkCreate(body)

    return orderItems
  }

  async deleteOrder(id) {
    const response = await Order.destroy({ where: { id } })
    return response
  }
}

module.exports = new OrderService()
