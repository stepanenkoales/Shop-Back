const { User } = require('../db/models')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const jwtService = require('../utils/jwt.service')
const config = require('../config')
const templateEmailService = require('./mail.service')
const password = require('secure-random-password')

class UserService {
  saltRounds = 10

  async login(email, password) {
    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      throw new createError.BadRequest('Email not found')
    }

    if (!user.verified) {
      throw new createError.BadRequest('User not verified')
    }

    const match = await this.comparePasswords(password, user.password)

    if (!match) {
      throw new createError.BadRequest('Wrong password')
    }

    const accessToken = jwtService.encode(
      { id: user.id },
      config.accessTokenSecret,
      config.accessTokenExpIn
    )
    const refreshToken = jwtService.encode(
      { id: user.id },
      config.refreshTokenSecret,
      config.refreshTokenExpIn
    )

    return { accessToken, refreshToken }
  }

  async register(email, password) {
    const foundUser = await User.findOne({
      where: { email },
    })

    if (foundUser) {
      throw new createError.Conflict('User already exists')
    }

    const hashedPassword = await this.hashPassword(password)
    const user = await User.create({
      email,
      password: hashedPassword,
      verified: false,
    })
    const token = jwtService.encode(
      { id: user.id },
      config.accessTokenSecret,
      config.accessTokenExpIn
    )
    await templateEmailService.sendVerificationEmail(email, token)
    user.password = undefined

    return user
  }

  verify(token) {
    const payload = jwtService.decode(token, config.accessTokenSecret)
    User.update(
      { verified: true },
      {
        where: {
          id: payload.id,
        },
      }
    )
  }

  async refresh(token) {
    const payload = jwtService.decode(token, config.refreshTokenSecret)
    const user = await User.findByPk(payload.id)

    if (!user.verified) {
      throw new createError.BadRequest('User not verified')
    }

    const accessToken = jwtService.encode(
      { id: user.id },
      config.accessTokenSecret,
      config.accessTokenExpIn
    )
    const refreshToken = jwtService.encode(
      { id: user.id },
      config.refreshTokenSecret,
      config.refreshTokenExpIn
    )

    return { accessToken, refreshToken }
  }

  async reset(email) {
    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      return null
    }

    if (!user.verified) {
      return null
    }

    const resetPassword = password.randomPassword({
      length: 9,
      characters: [password.lower, password.upper, password.digits],
    })
    const hashedPassword = await this.hashPassword(resetPassword)
    user.update({ password: hashedPassword })
    await templateEmailService.sendResetPassword(email, resetPassword)
    user.password = undefined

    return user
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(this.saltRounds)

    return bcrypt.hash(password, salt)
  }

  comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }
}

module.exports = new UserService()
