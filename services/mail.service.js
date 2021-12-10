const config = require('../config');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { send } = require('express/lib/response');

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = config.apiKey;

module.exports =  (userName, email) => {
   return new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
        {
          subject:'Please verify your acccount',
          sender : {'email':'stepanenkoales@gmail.com', 'name':'your app'},
          to: [{'name': userName, 'email': email}],
          htmlContent: '<html><body><h1>This is a transactional email </h1></body></html>',      
        }
    )
    
    
}