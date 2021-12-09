const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

class UserService {
    saltRounds = 10;

    async login(email, password) {
        const user = await User.findOne({
            where: {email}
        })

        if (!user) {
            throw new createError.Unauthorized('email not found')
        }
        
        if (!user.verified) {
            throw new createError.Unauthorized('user not verified')
        }

        const match = await this.comparePasswords(password, user.password);
        
        if (!match) { 
            throw new createError.Unauthorized('wrong pass')
        } 
        
        return true;
    }

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

    comparePasswords(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}

module.exports = new UserService();
