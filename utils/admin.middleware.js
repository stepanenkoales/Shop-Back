const createError = require('http-errors')
const handleRouteErrors = require('./handleRouteErrors')

module.exports = handleRouteErrors(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new createError.Forbidden()
  }

  next()
})
