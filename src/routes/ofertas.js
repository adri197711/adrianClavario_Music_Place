var express = require('express');
var router = express.Router();
const ofertasController = require('../controllers/ofertasController')
/* GET home page. */
router.get('/', ofertasController.index);

module.exports = router;