const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const path = require('path');
const { User, Rol } = require('../database/models')

module.exports = {


  login: (req, res) => {
    return res.render('users/login', {
      title: 'Login',
      errors: {},
      old: {}
    });
  },

processLogin: async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('users/login', {
      errors: errors.mapped(),
      old: req.body
    });
  }

  const { email, password, recordar } = req.body;
  const user = await User.findOne({
  where: { email },
  attributes: ['id','name','email', 'password', 'rolId', 'avatar'], 
});;  


  if (!user) {
    return res.render('users/login', {
      errors: {
        email: { msg: 'Credenciales inválidas' }
      },
      old: req.body
    });
  }

  const passOk = bcrypt.compareSync(password, user.password);
  if (!passOk) {
    return res.render('users/login', {
      errors: {
        password: { msg: "Credenciales inválidas" }
      },
      old: req.body
    });
  }

  const userLogin = {
    id: user.id,
    name: user.name,
    email: user.email,
    rolId: user.rolId,
    avatar: user.avatar,
  };

  req.session.userLogin = userLogin;
console.log('USERLOGIN: ', userLogin)
  if (recordar) {
    res.cookie("user", JSON.stringify(userLogin), { maxAge: 60000 * 60 * 30 });
  }

  console.log('🧠 Session:', req.session.userLogin);

  return res.redirect('/');
},

  register: async (req, res) => {
    try {
      const rols = await Rol.findAll();
      return res.render('users/register', {
        title: 'Cargar Usuario',
        rols,
        old: {},
        errors: {}
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al cargar el formulario de registro');
    }
  },

  processRegister: async (req, res) => {
    try {
      const errors = validationResult(req);

      const rols = await Rol.findAll();
      const { name, surname, username, email, password, token, validated, locked, rolId } = req.body;

      const avatar = req.file ? req.file.filename : null;

      if (!errors.isEmpty()) {
        return res.render('users/register', {
          title: 'Cargar Usuario',
          rols,
          avatar,
          old: req.body,
          errors: errors.mapped()
        });
      }

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.render('users/register', {
          title: 'Cargar Usuario',
          rols,
          avatar,
          old: req.body,
          errors: {
            email: { msg: 'Este email ya está registrado' }
          }
        });
      }

      console.log('BODY:', req.body);
      await User.create({
        name,
        surname,
        username,
        email,
        avatar,
        password:  await bcrypt.hash(password, 10),
        token: null,
        validated: false,
        locked: false,
        rolId: parseInt(rolId)
      });
      console.log('BODY:', req.body);
      return res.redirect('/users/login');
    } catch (error) {
      console.error('Error detallado:', error);
      return res.status(500).send('Error al crear el usuario');
    }
  },


  profile: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      const rols = await Rol.findAll();

      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      return res.render("users/profile", {
        title: "Editar usuario",
        user,
        rols,
        errors: {},
        old: {},

      });

    } catch (error) {
      console.error('Error en obtener el perfil de usuario:', error);
      return res.status(500).send('Internal Server Error');
    }
  },

  update: async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
    const rols = await Rol.findAll();
    const user = await User.findByPk(id);
    console.log(errors.array());

    if (!errors.isEmpty()) {
      return res.render('users/profile', {
        title: 'Editar usuario',
        user,
        rols,
        old: req.body,
        errors: errors.mapped()
      });
    }

    try {
      const { name, surname, username, email, password, rolId }
        = req.body;

      const existingUser = await User.findByPk(id);
      let avatar = existingUser.avatar;

      if (req.file) {
        console.log('ARCHIVO SUBIDO:', req.file);
        // Si existe una imagen anterior, eliminarla
        if (existingUser.avatar) {
          const oldImagePath = path.join(__dirname, '../../public/images/users/', existingUser.avatar);
          if (fs.existsSync(oldImagePath)) {
            fs.unlink(oldImagePath, (err) => {
              if (err) {
                console.error('Error al eliminar imagen anterior:', err);
              } else {
                console.log('Imagen anterior eliminada:', oldImagePath);
              }
            });
          }
        }

        avatar = req.file.filename;  // Nuevo avatar
      }

      // if (!existingUser) {
      //   return res.status(404).send('Usuario no encontrado');
      // }

      const newPassword = password
        ? bcrypt.hashSync(password, 10)
        : existingUser.password;
const usersModify = await User.update({
  name: name.trim(),
  surname: surname.trim(),
  username: username.trim(),
  email: email.trim(),
  password: newPassword,
  avatar,
  token: null,
  validated: false,
  locked: false,
  rolId: +rolId // 👈 asegúrate que estás usando `rolId`, no `rol`
}, {
  where: { id },
  returning: true
});
      console.log('USERS MODIFY', usersModify)

      return res.redirect('/user/')

    } catch (error) {
      console.error('ERROR EN UPDATE USER:', error)
      return res.status(500).send('Internal Server Error');
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('user');
      res.redirect("/");
    });
  },

  remove: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
      await user.destroy();
      return res.redirect('/user');
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  }
}



