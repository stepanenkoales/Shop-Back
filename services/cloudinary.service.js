const cloudinary = require('cloudinary').v2
const conf = require('../config')
const cloudinaryConfig = cloudinary.config({
  cloud_name: conf.cloudinaryName,
  api_key: conf.cloudinaryApiKey,
  api_secret: conf.cloudinaryApiSecret,
  secure: true,
})

class CloudinaryService {
  getCredentials(public_id) {
    const cloudName = cloudinaryConfig.cloud_name
    const api_key = cloudinaryConfig.api_key
    const timestamp = Math.round(new Date().getTime() / 1000)

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        public_id,
      },
      cloudinaryConfig.api_secret
    )

    return { timestamp, signature, api_key, cloudName }
  }

  async uploadImage({ file, public_id }) {
    const { timestamp, signature, api_key } = this.getCredentials(public_id)

    try {
      const response = await cloudinary.uploader.upload(file, {
        signature,
        public_id,
        api_key,
        timestamp,
      })
      return response.public_id
    } catch (err) {
      throw err
    }
  }

  async deleteImage(public_id) {
    const { timestamp, signature, api_key } = this.getCredentials(public_id)

    try {
      const response = await cloudinary.uploader.destroy(public_id, {
        signature,
        api_key,
        timestamp,
        public_id,
      })
      return response
    } catch (err) {
      throw err
    }
  }
}

module.exports = new CloudinaryService()
