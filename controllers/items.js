const express = require('express')
const router = express.Router()
const itemService = require('../services/item.service')
const handleRouteErrors = require('../utils/handleRouteErrors')
const jwtMiddleware = require('../utils/jwt.middleware')
const adminMiddleware = require('../utils/admin.middleware')

router.get(
  '/',
  handleRouteErrors(async (req, res) => {
    const result = await itemService.findItem(req.query)
    res.json(result)
  })
)

router.post(
  '/',
  jwtMiddleware,
  adminMiddleware,
  handleRouteErrors(async (req, res) => {
    const response = await itemService.addItem(req.body)
    res.json(response)
  })
)

router.put(
  '/:id',
  jwtMiddleware,
  adminMiddleware,
  handleRouteErrors(async (req, res) => {
    const response = await itemService.updateItem(
      req.params.id,
      req.body.price,
      req.body.description
    )
    res.json(response)
  })
)

router.delete(
  '/:id',
  jwtMiddleware,
  adminMiddleware,
  handleRouteErrors(async (req, res) => {
    const response = await itemService.deleteItem(req.params.id)
    res.json(response)
  })
)

module.exports = router
