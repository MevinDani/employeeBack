const express = require('express')
const { employeeRegister } = require('../controllers/logic')
const upload = require('../multer/multerConfig')

// create an object for router class in express
const router = new express.Router()

// route for regiter new employee
router.post('/employees/register', upload.single('user_profile'), employeeRegister)

module.exports = router