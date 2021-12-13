const config = require('../config');
const nodemailer = require('nodemailer');
const handlebars = require("handlebars");
const path = require("path")
const fs = require("fs")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../templates/template.hbs"), "utf8")
const template = handlebars.compile(emailTemplateSource)
const url = 'http://localhost:3000/user/verify/';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alstsepanenka@gmail.com',
    pass: config.password
  }
});

module.exports = async (email, token) => {
  const htmlToSend = template({link: url+token})
  const response = await transporter.sendMail({
    from: 'My project',
    to: email,
    subject: 'transactional email',
    html: htmlToSend
  })
  
  return response;
} 


