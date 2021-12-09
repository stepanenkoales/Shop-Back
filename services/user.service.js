const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

class UserService {
    saltRounds = 10;

    async register(email, password) {

        const foundUser = await User.findOne({
            where: {email}, 
        })

        if (foundUser) {
            throw new createError.Conflict('User already exists');
        }

        const hashedPassword = await this.hashPassword(password)
        const user = await User.create({ email, password: hashedPassword, verified: false });
        // delete user.password;
        user.password = undefined;
        return user;
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(this.saltRounds);

        return bcrypt.hash(password, salt);
    }

    comparsePasswords(password, hashedPassword) {

    }
}

module.exports = new UserService();
