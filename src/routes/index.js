const express = require('express');
const router = express.Router();
const {index, admin,users,usersAdmin, adminProducts, adminUsers } = require('../controllers/indexController');
const adminCheck = require('../middlewares/adminCheck');


router
    .get('/', index)
    .get('/admin',adminCheck,admin)
    .get('/user',adminCheck,users)
    .get('/usersAdmin',adminCheck,usersAdmin)
     .get('/admin/products',adminCheck,admin)
   .get('/admin/users',adminCheck, adminUsers)

module.exports = router;
