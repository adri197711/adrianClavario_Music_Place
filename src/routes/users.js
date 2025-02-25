const express = require('express');
const router = express.Router();
const { register, processRegister, login, processLogin, logout, profile, update } = require('../controllers/usersController')
const userSessionCheck = require('../middlewares/userSessionCheck')




router
    .get('/register', register)
    .post('/processRegister', processRegister)
    .get('/login', login)
    .post('/processLogin',userSessionCheck, processLogin)
    .get('/logout', logout)
    .get('/profile/:id', profile)
    .put('/update/:id', update)
module.exports = router;
