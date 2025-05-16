const { check } = require('express-validator');

const productValidation = [
  check('name')
    .not().isEmpty().withMessage('El nombre del producto es requerido')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  check('price')
    .not().isEmpty().withMessage('El precio es requerido')
    .isInt().withMessage('El precio debe ser un número entero')
    .isNumeric().withMessage('El precio debe ser un número válido')
    .isInt({ min: 0 }).withMessage('El precio no puede ser negativo'),

  check('discount')
    .isInt().withMessage('El descuento debe ser un número entero')
    .isNumeric().withMessage('El descuento debe ser un número válido')
    .isInt({ min: 0 }).withMessage('El descuento no puede ser negativo')
    .isInt({ max: 100 }).withMessage('El descuento no puede exceder el 100%'),

 check('sectionId')
  .notEmpty().withMessage('Debes seleccionar una sección.')
  .isInt({ min: 1 }).withMessage('Sección inválida.'),
    
  check('categoryId')
    .not().isEmpty().withMessage('La categoría es requerida')
    .isInt().withMessage('La categoría debe ser un número válido'),
    
  check('brandId')
    .notEmpty().withMessage('La marca es requerida')
    .isInt().withMessage('La marca debe ser un número válido'),

  check('description')
    .isLength({ min: 20, max: 500 }).withMessage('La descripción debe tener entre 20 y 500 caracteres'),
];




const productCreateValidation = [
  check('name')
    .notEmpty().withMessage('El nombre del producto es requerido')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  check('price')
    .notEmpty().withMessage('El precio es requerido')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor que 0'),

  check('discount')
    .optional()
    .isInt({ min: 0, max: 100 }).withMessage('El descuento debe ser un número entre 0 y 100'),

  check('sectionId')
    .notEmpty().withMessage('La sección es requerida')
    .isInt().withMessage('La sección debe ser un número válido'),

  check('categoryId')
    .notEmpty().withMessage('La categoría es requerida')
    .isInt().withMessage('La categoría debe ser un número válido'),

  check('brandId')
    .notEmpty().withMessage('La marca es requerida')
    .isInt().withMessage('La marca debe ser un número válido'),

  check('description')
  .notEmpty().withMessage('La descripción es requerida')
    .isLength({ min: 20, max: 500 }).withMessage('La descripción debe tener entre 20 y 500 caracteres'),
];


module.exports = {productValidation, productCreateValidation};