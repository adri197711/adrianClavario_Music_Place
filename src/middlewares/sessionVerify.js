const sessionVerify = (function (req, res, next) {

  console.log("SESSION: ", req.session)
  console.log("COOKIES", req.cookies)

  
  if(req.cookies.user){
    req.session.userLogin = req.cookies.user;
  }

  if (req.session.userLogin) {
    res.locals.userLogin = req.session.userLogin;
  }
  next();
})

module.exports = sessionVerify;