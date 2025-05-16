const { check } = require("express-validator");
const { User } = require("../database/models");

const registerValidator = [
      // Validación de nombre
    check('name')
        .not().isEmpty().withMessage('El nombre es requerido')
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .escape(),

    // Validación de apellido
    check('surname')
        .not().isEmpty().withMessage('El apellido es requerido')
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres')
        .escape(),

    // Validación de usuario
    check('username')
        .not().isEmpty().withMessage('El nombre de usuario es requerido')
        .trim()
        .isLength({ min: 4, max: 30 }).withMessage('El nombre de usuario debe tener entre 4 y 30 caracteres')
        .escape()
        .custom(async (value) => {
            const user = await User.findOne({ where: { username: value } });
            if (user) {
                throw new Error('Este nombre de usuario ya está en uso');
            }
        }),

    // Validación de email
    check('email')
        .not().isEmpty().withMessage('El email es requerido')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('El email debe ser válido')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                throw new Error('Este email ya está registrado');
            }
        }),

 
    // Validación de contraseña
    check('password')
        .not().isEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula, un número y 8 caracteres'),

    // Validación de confirmación de contraseña
    check('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
        check('rolId')
  .notEmpty().withMessage('El rol es obligatorio')
  .isInt().withMessage('El rol debe ser un número válido'),

check('avatar')
  .custom((value, { req }) => {
    if (req.file) {
      const ext = req.file.originalname.split('.').pop().toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) {
        throw new Error('Formato de imagen inválido');
      }
    }
    return true;
  }),
    // Validación de términos y condiciones
  check('aceptoTerminos')
  .custom((value) => {
    if (value !== 'on') {
      throw new Error('Debes aceptar los términos y condiciones');
    }
    return true;
  })
]

const userEditValidator = [

  check('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres'),

  check('surname')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres'),

  check('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { username: value } });
      if (user && user.id !== parseInt(req.params.id)) {
        throw new Error('Ese nombre de usuario ya está en uso');
      }
      return true;
    }),

  check('email')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Debe ser un correo válido')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { email: value } });
      if (user && user.id !== parseInt(req.params.id)) {
        throw new Error('Ese correo ya está en uso');
      }
      return true;
    }),

    check('password')
  .optional({ checkFalsy: true }) 
  .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
  .withMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial'),

check('rolId')
  .notEmpty().withMessage('El rol es obligatorio')
  .isInt().withMessage('El rol debe ser un número válido'),

];

module.exports = {userEditValidator,registerValidator};