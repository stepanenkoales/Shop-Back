const express = require('express')
const router = express.Router()
const orderService = require('../services/order.service')
const handleRouteErrors = require('../utils/handleRouteErrors')
const jwtMiddleware = require('../utils/jwt.middleware')

router.get(
  '/',
  jwtMiddleware,
  handleRouteErrors(async (req, res) => {
    const result = await orderService.findOrders(req.user.id, req.query)
    res.json(result)
  })
)

router.post(
  '/',
  jwtMiddleware,
  handleRouteErrors(async (req, res) => {
    const { body, value } = req.body
    const response = await orderService.addOrder(req.user.id, body, value)
    res.json(response)
  })
)

router.delete(
  '/',
  jwtMiddleware,
  handleRouteErrors(async (req, res) => {
    const response = await orderService.deleteOrder(req.body.id)
    res.json(response)
  })
)

module.exports = router
