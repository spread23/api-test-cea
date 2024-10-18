const express = require('express')

const UserController = require('../controllers/user')
const  check = require('../middlewares/auth')

const router = express.Router()

router.get('/test-user', UserController.userTest)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/get-users', check.auth, UserController.getUsers)
router.delete('/delete-user/:id', UserController.deleteUser)

module.exports = router