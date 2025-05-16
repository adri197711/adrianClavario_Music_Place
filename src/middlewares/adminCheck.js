const adminCheck = (req, res, next) => {
  if (!req.session.userLogin) {
    return res.redirect('/users/login'); 
  }

  if (!req.session.userLogin === 1) {
    return res.status(403).send('Acceso denegado. Solo administradores.');
  }

  next();
};


module.exports = adminCheck;