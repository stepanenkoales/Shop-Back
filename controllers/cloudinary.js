const express = require('express')
const multer = require('multer')
const upload = multer()
const router = express.Router()
const cloudinaryService = require('../services/cloudinary.service')
const handleRouteErrors = require('../utils/handleRouteErrors')
const jwtMiddleware = require('../utils/jwt.middleware')
const adminMiddleware = require('../utils/admin.middleware')

router.post(
  '/upload',
  jwtMiddleware,
  adminMiddleware,
  upload.single(),
  handleRouteErrors(async (req, res) => {
    const result = await cloudinaryService.uploadImage(req.body)
    res.json(result)
  })
)

router.post(
  '/delete',
  jwtMiddleware,
  adminMiddleware,
  handleRouteErrors(async (req, res) => {
    const result = await cloudinaryService.deleteImage(req.body.public_id)
    res.json(result)
  })
)

module.exports = router
