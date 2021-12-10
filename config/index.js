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
};

module.exports = config;
