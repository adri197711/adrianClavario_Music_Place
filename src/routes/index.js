const express = require('express');
const router = express.Router();
const {index, admin,usersAdmin, adminProducts, adminUsers } = require('../controllers/indexController');

// const adminCheck = require('../middlewares/adminCheck');
// const userSessionCheck = require('../middlewares/userSessionCheck')


router
    .get('/', index)
    .get('/admin',admin)
    .get('/usersAdmin',usersAdmin)
     .get('/admin/products',admin)
   .get('/admin/users', adminUsers)

module.exports = router;
