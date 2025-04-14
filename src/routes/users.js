const express = require('express');
const router = express.Router();
const { register, processRegister, login, processLogin, logout, update,remove, profile } = require('../controllers/usersController')
const validationLogin = require('../middlewares/loginVerify')
const sessionVerify = require('../middlewares/sessionVerify');
const upload = require('../middlewares/uploadUser');

router
    .get('/register', register)
    .post('/processRegister',upload.single('avatar'), processRegister)
    .get('/login',login)
    .post('/processLogin',validationLogin, sessionVerify, processLogin)
    .get('/profile/:id', profile)
    .put('/update/:id', upload.single('avatar'), update)
    .get('/logout', logout)
    .delete('/remove/:id', remove)
module.exports = router;
