const adminCheck = (req,res,next) => {
  if(req.session.userLogin && req.session.userLogin.rolId == 1){
      return next()
  }
  return res.redirect('/users/login')
}

module.exports = adminCheck