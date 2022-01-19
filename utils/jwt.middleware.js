const jwtService = require('./jwt.service')
const config = require('../config')
const { User } = require('../db/models')
const createError = require('http-errors')
const handleRouteErrors = require('./handleRouteErrors')

module.exports = handleRouteErrors(async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    throw new createError.Unauthorized('token undefined')
  }

  const payload = jwtService.decode(
    token.split(' ')[1],
    config.accessTokenSecret
  )
  const user = await User.findByPk(payload.id)

  if (!user.verified) {
    throw new createError.Forbidden('User not verified')
  }

  req.user = user
  next()
})
