const authConntroller = require('../controller/authController')
const express = require('express');
const router = express.Router();

router.post('/register',authConntroller.register);

module.exports = router;