const config = {
  dbHost: process.env.DB_HOST,
  db: process.env.DB_NAME,
  dbUsername: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,

  accessTokenExpIn: process.env.ACCESS_TOKEN_EXP,
  refreshTokenExpIn: process.env.REFRESH_TOKEN_EXP,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,

  apiKey: process.env.API_KEY,

  password: process.env.PASSWORD,
  baseUrl: process.env.BASE_URL,
  backBaseUrl: process.env.BACK_BASE_URL,

  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryUrl: process.env.CLOUDINARY_URL,
}

module.exports = config
