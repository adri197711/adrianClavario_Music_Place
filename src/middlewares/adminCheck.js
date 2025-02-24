
const adminCheck = (req,res,next) => {

  if(req.session.userLogin && req.session.userLogin.rol === "admin"){
return next()
  }
  return res.redirect('/')
}


module.exports = adminCheck;