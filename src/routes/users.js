const express = require('express');
const router = express.Router();
const { register, processRegister, login, processLogin, logout, profile, update } = require('../controllers/usersController')
const validationLogin = require('../middlewares/loginVerify')
const sessionVerify = require('../middlewares/sessionVerify');



router
    .get('/register', register)
    .post('/processRegister', processRegister)
    .get('/login',validationLogin,login)
    .post('/processLogin',sessionVerify,processLogin)
    .get('/profile/:id', profile)
    .put('/update/:id', update)
    .get('/logout', logout)
module.exports = router;
