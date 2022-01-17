const { DataTypes, UUIDV4 } = require('sequelize')

module.exports = (sequelize) => {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },

    category: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },

    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  })

  return Category
}
