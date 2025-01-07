const productsController = {
  index: function (req, res) {
    res.render('products', {title:'Instrumentos'});
  }
}
module.exports = productsController;