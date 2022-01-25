const { DataTypes, UUIDV4 } = require('sequelize')

module.exports = (sequelize, Category) => {
  const Item = sequelize.define('item', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },

    name: {
      type: DataTypes.TEXT,
      unique: true,
    },

    price: DataTypes.DECIMAL,

    description: DataTypes.TEXT,
  })

  Category.hasMany(Item, {})

  Item.belongsTo(Category, {
    foreignKey: {
      allowNull: false,
      name: 'categoryId',
    },
  })

  return Item
}
