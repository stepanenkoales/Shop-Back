const express = require('express')
const router = express.Router()
const categoryService = require('../services/category.service')
const handleRouteErrors = require('../utils/handleRouteErrors')
const jwtMiddleware = require('../utils/jwt.middleware')
const adminMiddleware = require('../utils/admin.middleware')

router.get(
  '/',
  handleRouteErrors(async (req, res) => {
    const result = await categoryService.findCategory(req.query.name)
    res.json(result)
  })
)

router.post(
  '/',
  jwtMiddleware,
  adminMiddleware,
  handleRouteErrors(async (req, res) => {
    const response = await categoryService.addCategory(req.body)
    res.json(response)
  })
)

module.exports = router
