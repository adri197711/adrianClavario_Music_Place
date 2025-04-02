const express = require('express');
const router = express.Router();
const { register, processRegister, login, processLogin, logout, update,remove, profile } = require('../controllers/usersController')
const validationLogin = require('../middlewares/loginVerify')
const sessionVerify = require('../middlewares/sessionVerify');
const upload = require('../middlewares/uploadUser');



router
    .get('/register', upload.single('avatar'), register)
    .post('/processRegister',upload.single('avatar'), processRegister)
    .get('/login',validationLogin,login)
    .post('/processLogin',sessionVerify,processLogin)
    .get('/profile/', profile)
    .put('/update/:id', upload.single('avatar'), update)
    .get('/logout', logout)
    .delete('/remove/:id', remove)
module.exports = router;
