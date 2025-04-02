const { v4: uuidv4, validate } = require('uuid');
const bcrypt = require('bcrypt');
const { User } = require('../database/models')

module.exports = {

  register: (req, res) => {
    return res.render('users/register'), { title: 'Cargar Usuario' }
  },

  processRegister: async (req, res) => {
    try {
      const { name, surname, username, email, password} = req.body;
      const avatar = req.file ? req.file.filename : null;

      // TODO : VALIDAR LOS DATOS INGRESADOS EN EL FORMULARIO

      await User.create({
        name,
        surname,
        username,
        email,
        avatar,
        password: bcrypt.hashSync(password, 10),
        token : null,
        validated : false,
        locked : false,
        rolId : 3,
      });
      // !ERROR: NO ESTÁS CONSTRUYENDO UNA API REST PARA DEVOLVER UN JSON 
      // res.status(201).json({ message: 'Usuario agregado con éxito', user: newUser });
      return res.redirect('/users/login')
    } catch (error) {
      // !ERROR: NO ESTÁS CONSTRUYENDO UNA API REST PARA DEVOLVER UN JSON 
      //res.status(500).json({ message: 'Error al crear el Usuario', error: error.message });
      // TODO: ENVIAR ERRORES DE VALIDACIÓN
      return res.render('users/register')
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

    const user = await User.findByPk(req.session.userLogin.id);

    return res.render('users/profile', {
      ...user.dataValues
    })
  },

  update: async(req, res) => {
    const { name, surname, username, email }
      = req.body;

    try {
      const usersModify = await User.update({
        name : name.trim(),
        surname : surname.trim(),
        username : username.trim(),
        email : email.trim(),
      },
        { where: { id: req.session.userLogin.id } });
      console.log('users MODIFY: ', usersModify)

      return res.redirect('/users/profile')
    } catch (error) {
      return res.render('users/profile')
      
      // !ERROR: NO ESTÁS CONSTRUYENDO UNA API REST PARA DEVOLVER UN JSON 
      // return res.status(500).send('Internal Server Error');
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
        // !ERROR: NO ESTÁS CONSTRUYENDO UNA API REST PARA DEVOLVER UN JSON 
        // return res.status(404).send('Usuario no encontrado');
      }
  
      await user.destroy();
      return res.redirect('/');
    } catch (error) {
      // !ERROR: NO ESTÁS CONSTRUYENDO UNA API REST PARA DEVOLVER UN JSON 
      // return res.status(500).send('Internal Server Error');
    }
  }
}    
    
