const express = require('express');
const router = express.Router();
const adminCheck = require('../middlewares/adminCheck')
const path = require('path');
const upload = require('../middlewares/uploadFile')
const { guitarras,bajos,baterias,teclados,accesorios,amplis, audio } = require('../controllers/navController')

router
    .get('/guitarras', guitarras)
    .get('/bajos', bajos)
    .get('/baterias', baterias)
    .get('/teclados', teclados)
    .get('/accesorios',accesorios)
    .get('/amplis', amplis)
    .get('/audio',audio)

module.exports = router;