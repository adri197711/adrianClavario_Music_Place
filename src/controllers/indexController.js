


const indexController = {
  index:function(req, res, next) {
    res.render('index', { title: 'home'});
  }
}
module.exports = indexController;