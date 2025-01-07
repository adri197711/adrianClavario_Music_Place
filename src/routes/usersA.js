var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Esta sera la página de usuarios');
});

module.exports = router;
