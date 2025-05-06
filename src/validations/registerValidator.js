const { check } = require("express-validator");
const db = require("../database/models");

const registerValidator = [
    check("name").notEmpty().withMessage("El nombre es requerido"),
    check("surname").notEmpty().withMessage("El appellido es requerido"),
    check("email")
        .notEmpty().withMessage("El email es requerido").bail()
        .isEmail().withMessage("El email debe ser válido").bail()
        .custom((value) => {
            return db.User.findOne({ where: { email: value } })
               .then((user) => {                
                    if (user) {
                        return Promise.reject("El email ya está registrado");
                    }
                })
                .catch((error) => {                    
                    return Promise.reject(
                        new Error(error || "Error al verificar el email")
                    );
                })
            }),
    check("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    check("password2").custom((value, { req }) => {
        if (value !== req.body.password) {
            return false
        }
        return true
    }).withMessage("La confirmación de contraseña no coincide")
]

module.exports = registerValidator