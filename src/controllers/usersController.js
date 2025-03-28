const { v4: uuidv4, validate } = require('uuid');
const bcrypt = require('bcrypt');
const { User } = require('../database/models')

module.exports = {

  register: (req, res) => {
    return res.render('users/register'), { title: 'Cargar Usuario' }
  },

  processRegister: async (req, res) => {
    try {
      const { name, surname, username, email, password,token,validated,locked,rolId,createdAt,updatedAt } = req.body;
      const avatar = req.file ? req.file.filename : null;

      const newUser = await User.create({
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
      res.status(201).json({ message: 'Usuario agregado con éxito', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el Usuario', error: error.message });
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
        attributes: ['id', 'name', 'surname', 'username', 'email', 'password', 'avatar', 'validated', 'locked', 'token', 'createdAt', 'updatedAt']
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

      console.log("RECORDAR: ", req.body.recordar);
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
    const { id } = req.params

    const user = await User.findByPk(id);

    return res.render('users/profile', {
      ...user
    })
  },

  update: async(req, res) => {
    const { User } = require('../database/models')
    const { name, surname, username, email, avatar, password }
      = req.body;

    try {
      const usersModify = await User.update({
        name : name.trim(),
        surname : surname.trim(),
        username : username.trim(),
        email : email.trim(),
        password : password,
        avatar : avatar,
        token : null,
        validated : true,
        locked : false,
        rolId : rolId
      },
        { where: { id } });
      console.log('users MODIFY: ', usersModify)

      return res.redirect('/user')
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  },


  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('user');
    res.redirect("/");
  },

    remove: async(req, res) => {
      const { id } = req.params;
   
  try {
    const user = await User.findByPk(id);
   
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      await user.destroy();
      return res.redirect('/admin');
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  }
}    
    
