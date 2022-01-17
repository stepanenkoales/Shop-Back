const { DataTypes, UUIDV4 } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
    },

    password: DataTypes.TEXT,

    verified: DataTypes.BOOLEAN,

    role: {
      type: DataTypes.TEXT,
      defaultValue: 'user',
    },
  })

  return User
}
