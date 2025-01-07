var express = require('express');
var router = express.Router();
/* GET home page. */
const productsController = require('../controllers/productsController')

router.get('/', productsController.index);

module.exports = router;