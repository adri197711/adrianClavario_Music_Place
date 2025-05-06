const adminCheck = (req,res,next) => {
  if(req.session.userLogin && req.session.userLogin.rolId == 1){
      return next()
  }
  return res.status(403).render('error',{
    message: 'No tienes permisos para acceder a esta página'
})
}

module.exports = adminCheck