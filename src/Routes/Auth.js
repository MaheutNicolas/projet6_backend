const express = require('express');
const router = express.Router();
const { validateAuth } = require('../Validator/Auth');
const userCtrl = require('../Controllers/Auth');

router.post('/signup', validateAuth, userCtrl.signup);
router.post('/login', validateAuth, userCtrl.login);

module.exports = router;
