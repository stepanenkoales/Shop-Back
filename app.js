const express = require('express')
const cors = require('cors')
const app = express()
const createError = require('http-errors')
const globalErrorHandler = require('./utils/error.handler')
const logger = require('./utils/logger')
const usersController = require('./controllers/users')
const categoriesController = require('./controllers/categories')
const itemsController = require('./controllers/items')
require('./db')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  logger.info(JSON.stringify(req.body, null, 4))
  next()
})

app.use('/categories', categoriesController)

app.use('/items', itemsController)

app.use('/user', usersController)

app.use((req, res, next) => {
  next(new createError.NotFound())
})

app.use(globalErrorHandler)

app.listen(3000, () => {
  console.log('listening')
})
