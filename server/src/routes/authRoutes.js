const authConntroller = require('../controller/authController')
const express = require('express');
const router = express.Router();

router.post('/register',authConntroller.register);
router.post('/login',authConntroller.login);
module.exports = router;