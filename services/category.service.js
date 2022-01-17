const { Op } = require('sequelize')
const { Item, Category } = require('../db/models')
const config = require('../config')
const createError = require('http-errors')

class CategoryService {
  async findCategory(value) {
    if (value === 'parent') {
      const categories = await Category.findAll({
        where: { parentId: { [Op.eq]: null } },
      })
      return categories
    }

    if (value === 'subcategory') {
      const categories = await Category.findAll({
        where: { parentId: { [Op.not]: null } },
      })
      return categories
    }

    return Category.findAll()
  }

  async addCategory(categories) {
    const response = await Category.bulkCreate(categories, { validate: true })
    return response
  }
}

module.exports = new CategoryService()
