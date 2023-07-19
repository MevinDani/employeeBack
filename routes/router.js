const express = require('express')
const { employeeRegister, getAllEmpData, getUserById, deleteUserById } = require('../controllers/logic')
const upload = require('../multer/multerConfig')

// create an object for router class in express
const router = new express.Router()

// route for regiter new employee
router.post('/employees/register', upload.single('user_profile'), employeeRegister)

// get all employee data
router.get('/employees/getAllData', getAllEmpData)

// get user data by id
router.get('/view/:userId', getUserById)

// delete emp
router.delete('/employee/delete/:userId', deleteUserById)

module.exports = router