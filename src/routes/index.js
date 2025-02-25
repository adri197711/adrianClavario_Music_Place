const express = require('express');
const router = express.Router();
const {index, admin,users,usersAdmin, adminProducts, adminUsers } = require('../controllers/indexController');

 const adminCheck = require('../middlewares/adminCheck');
 const userSessionCheck = require('../middlewares/userSessionCheck')


router
    .get('/', index)
    .get('/admin',admin)
    .get('/user',users)
    .get('/usersAdmin',usersAdmin)
     .get('/admin/products',adminCheck,admin)
   .get('/admin/users',adminCheck, adminUsers)

module.exports = router;
