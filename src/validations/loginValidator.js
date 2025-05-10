const { check } = require("express-validator");
const db = require("../database/models");
const { compareSync } = require("bcrypt");

const loginValidator = [
    check("email")
        .notEmpty().withMessage("El email es requerido"),
    check("password")
        .notEmpty().withMessage("La contraseña es requerida").bail()
        .custom((value, { req }) => {
            return db.User.findOne({ where: { email: req.body.email } })
            .then((user) => {                
                if (!user || !compareSync(value, user.password)) {
                    return Promise.reject(
                        new Error("Las credenciales son inválidas")
                    );
                }
            })
            .catch((error) => {
                console.log(error);       
                return Promise.reject(
                    new Error(error ? error.message : "Error al verificar las credenciales")
                );
            })
        })
]



module.exports = loginValidator; 