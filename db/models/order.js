const { DataTypes, UUIDV4 } = require('sequelize')

module.exports = (sequelize, User) => {
  const Order = sequelize.define('order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      defaultValue: 'pending',
    },
  })

  User.hasMany(Order)

  Order.belongsTo(User, {
    foreignKey: {
      allowNull: false,
      name: 'userId',
    },
  })

  return Order
}
