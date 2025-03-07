function validationLogin(req,res,next) {
  if(req.session.userLogin){
res.redirect('/')
  }
  next()
}
module.exports = validationLogin;