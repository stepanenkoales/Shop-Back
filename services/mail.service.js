const config = require('../config')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alstsepanenka@gmail.com',
    pass: config.password,
  },
})

class TemplateEmailService {
  sendVerificationEmail(email, token) {
    const url = config.backBaseUrl + '/user/verify/'
    const link = url + token
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, '../templates/verification.hbs'),
      'utf8'
    )
    const template = handlebars.compile(emailTemplateSource)
    const htmlToSend = template({ link })
    const message = {
      from: 'E-commerce project',
      to: email,
      subject: 'verification email',
      html: htmlToSend,
    }
    const response = transporter.sendMail(message)

    return response
  }

  sendResetPassword(email, password) {
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, '../templates/resetPassword.hbs'),
      'utf8'
    )
    const template = handlebars.compile(emailTemplateSource)
    const htmlToSend = template({ password })
    const message = {
      from: 'E-commerce project',
      to: email,
      subject: 'reset password',
      html: htmlToSend,
    }
    const response = transporter.sendMail(message)

    return response
  }
}

module.exports = new TemplateEmailService()
