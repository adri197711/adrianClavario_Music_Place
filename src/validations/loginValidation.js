const { check } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const loginValidator = [
    // Email check
    check('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe ser un correo electrónico válido')
        .normalizeEmail(),

    // Password check
    check('password')
        .notEmpty().withMessage('La contraseña es requerida')
        
];

module.exports = loginValidator;
