const sessionVerify = (function (req, res, next) {

  console.log("SESSION: ", req.session)
  console.log("COOKIES", req.cookies)

  if (req.session.userLogin) {
    res.locals.userLogin = req.session.userLogin;
  }
  next();
})

module.exports = sessionVerify;