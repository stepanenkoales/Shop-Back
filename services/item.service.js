const { Op } = require('sequelize')
const { Item } = require('../db/models')
const config = require('../config')
const createError = require('http-errors')

class ItemService {
  async findItem(value) {
    const { currentPage, pageSize, categoryId, name } = value

    const getPagination = (currentPage, pageSize) => {
      const limit = pageSize ? pageSize : 5
      const offset = currentPage ? (currentPage - 1) * limit : 0
      return { limit, offset }
    }

    const { limit, offset } = getPagination(currentPage, pageSize)

    if (categoryId && name) {
      const { count, rows } = await Item.findAndCountAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.like]: `%${name}%`,
              },
            },
            { categoryId },
          ],
        },
        offset,
        limit,
      })
      return { rows, count }
    }

    if (categoryId) {
      const { count, rows } = await Item.findAndCountAll({
        where: { categoryId },
        offset,
        limit,
      })
      return { rows, count }
    }
  }

  async addItem(items) {
    const response = await Item.bulkCreate(items, { validate: true })
    return response
  }

  async updateItem(id, price, description) {
    const response = await Item.update(
      { price, description },
      { where: { id } }
    )
    return response
  }

  async deleteItem(id) {
    const response = await Item.destroy({ where: { id } })
    return response
  }
}

module.exports = new ItemService()
