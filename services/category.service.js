const { Op } = require('sequelize')
const { Item, Category } = require('../db/models')
const config = require('../config')
const createError = require('http-errors')
const { create } = require('handlebars')

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
    try {
      const response = await Category.bulkCreate(categories, { validate: true })
      return response
    } catch (err) {
      throw new createError.Conflict(err?.errors[0])
    }
  }
}

module.exports = new CategoryService()
