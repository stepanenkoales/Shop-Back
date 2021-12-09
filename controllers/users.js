const express = require('express');
const router = express.Router();
const userService = require ('../services/user.service');
const handleRouteErrors = require('../utils/handleRouteErrors');

router.post('/login', handleRouteErrors(async (req, res) => {
  const result = await userService.login(req.body.email, req.body.password)
  res.send(result);
}));

router.post('/', handleRouteErrors(async (req, res) => {
  const user = await userService.register(req.body.email, req.body.password)

  res.send(user);
}));

module.exports = router;
