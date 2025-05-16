const loggedVerify = (req, res, next) => {
 if (req.session && req.session.userLogin) {
    return next();
  }
  return res.redirect('/users/login')
};

module.exports = loggedVerify;