const { DataTypes, UUIDV4 } = require('sequelize')

module.exports = (sequelize, Order, Item) => {
  const OrderItem = sequelize.define('order_item', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },

    orderId: {
      type: DataTypes.UUID,
      references: {
        model: Order,
        key: 'id',
      },
    },

    itemId: {
      type: DataTypes.UUID,
      references: {
        model: Item,
        key: 'id',
      },
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    //ask V
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  })

  Order.belongsToMany(Item, { through: OrderItem })
  Item.belongsToMany(Order, { through: OrderItem })

  return OrderItem
}
