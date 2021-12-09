const express = require('express');
const router = express.Router();
const userService = require ('../services/user.service');
const handleRouteErrors = require('../utils/handleRouteErrors');

router.get('/', handleRouteErrors((req, res) => {
  res.send('respond with a resource');
}));

router.post('/', handleRouteErrors(async (req, res) => {
  const user = await userService.register(req.body.email, req.body.password)

  res.send(user);
}));

module.exports = router;
