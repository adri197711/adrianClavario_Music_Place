const express = require('express');
const router = express.Router();


const { list, detail, add, create, edit, update, remove, search } = require('../controllers/productsController')

router
    .get('/', list)
    .get('/detail/:id', detail)
    .get('/add', add)
    .post('/create', create)
    .get('/edit/:id', edit)
    .put('/update/:id', update)
    .delete('/remove/:id', remove)
    .get('/search', search)

module.exports = router;