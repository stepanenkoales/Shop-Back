const { Op } = require('sequelize')
const { Item } = require('../db/models')
const config = require('../config')
const createError = require('http-errors')

class ItemService {
  getPaginationProps({ limit, offset, categoryId, name, itemsId }) {
    if (itemsId) {
      return {
        where: {
          id: {
            [Op.or]: itemsId,
          },
        },
      }
    }

    if (categoryId && name) {
      return {
        where: {
          [Op.and]: [
            {
              name: {
                [Op.iLike]: `%${name}%`,
              },
            },
            {
              categoryId,
            },
          ],
        },
        offset,
        limit,
      }
    }

    if (name) {
      return {
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${name}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${name}%`,
              },
            },
          ],
        },
        offset,
        limit,
      }
    }

    if (categoryId) {
      return {
        where: { categoryId },
        offset,
        limit,
      }
    }
  }

  getPagination(currentPage, pageSize) {
    const limit = pageSize ? pageSize : 5
    const offset = currentPage ? (currentPage - 1) * limit : 0

    return { limit, offset }
  }

  async findItem({ currentPage, pageSize, categoryId, name, itemsId }) {
    const { limit, offset } = this.getPagination(currentPage, pageSize)
    const { rows, count } = await Item.findAndCountAll(
      this.getPaginationProps({ categoryId, name, limit, offset, itemsId })
    )

    return { rows, count }
  }

  async addItem(items) {
    try {
      const response = await Item.bulkCreate(items, { validate: true })
      return response
    } catch (err) {
      throw new createError.Conflict(err?.errors[0])
    }
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
