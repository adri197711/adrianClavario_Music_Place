const express = require('express');
const router = express.Router();
const adminCheck = require('../middlewares/adminCheck')
const path = require('path');
const upload = require('../middlewares/uploadFile')
const { list, detail, add, create, edit, update, remove, search, cart, cartDetail } = require('../controllers/productsController')
const {productValidation,productCreateValidation} = require('../validations/productValidator.js');



router
    .get('/amplis', list)
    .get('/guitars', list)
    .get('/detail/:id', detail)
    .get('/add', add)
    .post('/create',upload.single('image'), productCreateValidation, create)
    .get('/edit/:id', edit)
    .put('/update/:id',upload.single('image'),productValidation, update)
    .delete('/remove/:id', remove)
    .get('/search', search)
    // .get('/cart/:id',cart)
    // .get('/ofertas',cartDetail)

module.exports = router;