
const express = require('express');
const { body } = require('express-validator');

const validations = [
  body('name').isLength({min: 3}).withMessage('Ingrese su nombre y apellido'),
  body('documentType').notEmpty().withMessage('Seleccione su tipo de documento'),
  body('document').isNumeric().withMessage('Ingrese su número de documento'),
  body('email').isEmail().withMessage('Ingrese un email válido'),
  body('phone').isNumeric().withMessage('Ingrese su número telefónico'),
  body('birthDate').notEmpty().withMessage('Seleccione su fecha de nacimiento'),
  body('password').isLength({min: 5}).withMessage('Ingrese una contraseña de mínimo 5 caracteres')
]

module.exports = validations;
