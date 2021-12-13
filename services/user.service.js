const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwtService = require('../utils/jwt.service');
const config = require('../config');
const sendMail = require("./mail.service");

class UserService {
  saltRounds = 10;

  async login(email, password) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new createError.Unauthorized("email not found");
    }

    if (!user.verified) {
      throw new createError.Unauthorized("user not verified");
    }

    const match = await this.comparePasswords(password, user.password);

    if (!match) {
      throw new createError.Unauthorized("wrong pass");
    }

    const accessToken = jwtService.encode({id: user.id}, config.accessTokenSecret, config.accessTokenExpIn);
    const refreshToken = jwtService.encode({id: user.id}, config.refreshTokenSecret, config.refreshTokenExpIn);

    return {accessToken, refreshToken};
    
  }


  async register(email, password) {
    const foundUser = await User.findOne({
      where: { email },
    });

    if (foundUser) {
      throw new createError.Conflict("User already exists");
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      verified: false,
    });

    const token = jwtService.encode({id: user.id}, config.accessTokenSecret, config.accessTokenExpIn);

    try {
      await sendMail(email, token);

    } catch (e) {
      console.log(e);
    }
    user.password = undefined;
    
    return user;
  }


  async verify (token) {
    const payload = jwtService.decode(token, config.accessTokenSecret)
    await User.update({ verified: true }, {
      where: {
        id: payload.id
      }
    });
  }


  async hashPassword(password) {
    const salt = await bcrypt.genSalt(this.saltRounds);

    return bcrypt.hash(password, salt);
  }

  comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = new UserService();
