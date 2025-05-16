const { check } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const loginValidator = [
    // Email check
    check('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe ser un correo electrónico válido')
        .normalizeEmail()
        .custom(async (email, { req }) => {
            const user = await db.User.findOne({
                where: { email },
                attributes: ['id', 'email', 'password']
            });

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            // Save user for password validation
            req.user = user;
        }),

    // Password check
    check('password')
        .notEmpty().withMessage('La contraseña es requerida')
        
];

module.exports = loginValidator;
