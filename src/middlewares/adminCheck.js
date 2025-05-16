const adminCheck = (req,res,next) => {
1
 if (!req.session.userLogin) {
    return res.redirect('/users/login'); // No logueado
  }

  if (req.session.userLogin.rolId !== 1) {
    return res.status(403).send('Acceso denegado. Solo administradores.');
  }

  next();
}

module.exports = adminCheck