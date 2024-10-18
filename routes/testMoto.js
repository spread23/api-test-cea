const express = require('express')
const TestMotoController = require('../controllers/testMoto')
const check = require('../middlewares/auth')

const router = express.Router()

router.get('/test-moto', TestMotoController.test)
router.post('/register/:id', check.auth, TestMotoController.register)
router.get('/get-test/:id', check.auth, TestMotoController.getTest)

module.exports = router
