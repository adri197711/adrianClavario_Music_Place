const express = require('express');
const router = express.Router();
const { register, processRegister, login, processLogin, logout, update,remove, profile } = require('../controllers/usersController')
const {validationLogin }= require('../middlewares/loginVerify')
const adminCheck = require('../middlewares/adminCheck')
const loggedVerify = require('../middlewares/loggedVerify');
const upload = require('../middlewares/uploadUser');
const {userEditValidator, registerValidator} = require('../validations/registerValidator');
const loginValidator  = require('../validations/loginValidation');

router
    .get('/register',register)
    .post('/processRegister',upload.single('avatar'), registerValidator, processRegister)
    .get('/login', login)
    .post('/processLogin', loginValidator, processLogin)
    .get('/profile/:id', adminCheck, profile)
    .put('/update/:id', upload.single('avatar'), userEditValidator, update)
    .get('/logout', logout)
    .delete('/remove/:id',remove)
module.exports = router;
