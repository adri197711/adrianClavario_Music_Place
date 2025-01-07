const cartController = {
  index: function (req, res) {
    res.render('cart', {title:'Carrito'});
  }
}
module.exports = cartController;