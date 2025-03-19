const express = require('express');
const router = express.Router();
const adminCheck = require('../middlewares/adminCheck')
const upload = require('../middlewares/uploadFile')
const { list, detail, add, create, edit, update, remove, search, cart, cartDetail } = require('../controllers/productsController')

router
    .get('/products', list)
    .get('/detail/:id', detail)
    .get('/add', add)
    .post('/create',upload.single('image'), create)
    .get('/edit/:id', edit)
    .put('/update/:id',upload.single('image'), update)
    .delete('/remove/:id', remove)
    .get('/search', search)
    .get('/cart/:id',cart)
    .get('/ofertas',cartDetail)

module.exports = router;