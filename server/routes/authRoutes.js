const express = require('express');
const multer = require('multer');
const { login } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);

module.exports = router;
