const { v4: uuidv4, validate } = require('uuid');
const bcrypt = require('bcrypt');
const { User } = require('../database/models')

module.exports = {

  register: (req, res) => {
    return res.render('users/register'), {
      title: 'Cargar Usuario'
    }
  },

  processRegister: async (req, res) => {
    try {
      const { name, surname, username, email, password, token, validated, locked, rolId, createdAt, updatedAt } = req.body;
      const avatar = req.file ? req.file.filename : null;

      await User.create({
        name,
        surname,
        username,
        email,
        avatar,
        password: bcrypt.hashSync(password, 10),
        token,
        validated,
        locked,
        rolId,
        createdAt,
        updatedAt
      });
      return res.redirect('/users/login')
    } catch (error) {
      return res.redirect('/users/login')
    }
  },


  login: function (req, res) {
    return res.render('users/login', { title: 'Login' })
  },

  processLogin: async function (req, res) {
    const { email, password } = req.body;
    try {
      const { User } = require('../database/models');

      const user = await User.findOne({
        where: { email },
        attributes: ['id', 'name', 'surname', 'username', 'email', 'password', 'avatar', 'validated', 'locked', 'token', 'rolId']
      });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.render('users/login', {
          error: "Credenciales inválidas"
        });
      }

      const userLogin = {
        id: user.id,
        name: user.name,
        rolId: user.rolId,
        avatar: user.avatar,
        email: user.email
      };

      req.session.userLogin = userLogin;
console.log('userLogin: ', userLogin )
      if (req.body.recordar) {
        res.cookie("user", userLogin, { maxAge: 60000 * 60 * 30 }); // 30 minutos
      }

      return res.redirect('/');

    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).render('users/login', {
        error: "Ocurrió un error al procesar tu solicitud"
      });
    }
  },

  profile: async (req, res) => {
    try {
    const id = req.session.userLogin?.id;
    console.log('userLogin: ', id )
    if (!id) {
      return res.redirect('/users/login');  // Redirigir si no hay sesión activa
    }
      const user = await User.findByPk(id);

      if (user) {
        return res.render('users/profile', {
          user: user.get({ plain: true })
        });
      } else {
        return res.redirect('/users/login'); 
      }
    } catch (error) {
      console.error('Error en obtener el perfil de usuario:', error);
      return res.status(500).send('Internal Server Error');
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, surname, username, email,password,avatar, rol }
      = req.body;
    try {
      const existingUser = await User.findByPk(id);

      if (!existingUser) {
        return res.status(404).send('Usuario no encontrado');
      }
      let newPassword = password;
      if (newPassword) {
        // Encriptar la contraseña si se envió una nueva
        newPassword = bcrypt.hashSync(password, 10);
      } else {
        // Si no se envió, mantener la contraseña anterior
        newPassword = existingUser.password;
      }


      const usersModify = await User.update({
        name: name.trim(),
        surname: surname.trim(),
        username: username.trim(),
        email: email.trim(),
        password: newPassword,
        avatar: req.file ? req.file.filename : existingUser.avatar,
        token: null,
        validated: true,
        locked: false,
        rolId: rol
      },
        { where: { id } 
      });

      console.log('USERS MODIFY', usersModify)
      
      return res.redirect('/user/')

    } catch (error) {
      console.error('ERROR EN UPDATE USER:', error)
      return res.status(500).send('Internal Server Error');
    }
  },


  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('user');
    res.redirect("/");
  },

  remove: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
      await user.destroy();
      return res.redirect('/');
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  }
}



