const express = require('express')
const router = express.Router()
const userService = require('../services/user.service')
const handleRouteErrors = require('../utils/handleRouteErrors')
const jwtMiddleware = require('../utils/jwt.middleware')
const config = require('../config')

router.get(
  '/',
  jwtMiddleware,
  handleRouteErrors(async (req, res) => {
    res.json({ ...req.user.dataValues, password: undefined })
  })
)

router.get(
  '/verify/:token',
  handleRouteErrors(async (req, res) => {
    const result = await userService.verify(req.params.token)
    res.redirect(config.baseUrl + '/login')
  })
)

router.post(
  '/login',
  handleRouteErrors(async (req, res) => {
    const result = await userService.login(req.body.email, req.body.password)
    res.json(result)
  })
)

router.post(
  '/',
  handleRouteErrors(async (req, res) => {
    const user = await userService.register(req.body.email, req.body.password)
    res.send(user)
  })
)

router.post(
  '/refresh',
  handleRouteErrors(async (req, res) => {
    const result = await userService.refresh(req.body.refreshToken)
    res.json(result)
  })
)
router.post(
  '/reset',
  handleRouteErrors(async (req, res) => {
    const result = await userService.reset(req.body.email)
    res.json(result)
  })
)

module.exports = router
