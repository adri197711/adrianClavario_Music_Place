const express = require('express');
const router = express.Router();
const {index, admin,users,usersAdmin} = require('../controllers/indexController');
const adminCheck = require('../middlewares/adminCheck')


router
    .get('/',index)
    .get('/admin',admin)
    .get('/user',adminCheck,users)
    .get('/user/admin',usersAdmin)
     .get('/admin/products',admin)
   .get('/user/users',users)

module.exports = router;
