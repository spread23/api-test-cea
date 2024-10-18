const express = require('express')
const TestCarController = require('../controllers/testCar')
const check = require('../middlewares/auth')

const router = express.Router()

router.get('/test-car', TestCarController.test)
router.post('/register/:id', check.auth, TestCarController.register)
router.get('/get-test/:id', check.auth, TestCarController.getTest)

module.exports = router
