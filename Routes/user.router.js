const express = require('express')
const signUpController = require('../Controllers/signUp.controller')
const validate = require('../Middleware/validate')
const { signUp, logIn } = require('../Schema/user.schema')
const loginController = require('../Controllers/login.controller')
const getUsersController = require('../Controllers/getUsers.controller')

const router = express.Router()

router.get('/', getUsersController)
router.post('/signup', validate(signUp), signUpController);
router.post('/login', validate(logIn), loginController);

module.exports = router;