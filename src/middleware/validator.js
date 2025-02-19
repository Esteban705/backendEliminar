const { check } = require('express-validator');

exports.registerValidation = [
    check('email', 'Email inválido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('name', 'El nombre es requerido').not().isEmpty()
];

exports.loginValidation = [
    check('email', 'Email inválido').isEmail(),
    check('password', 'La contraseña es requerida').exists()
];

exports.superheroValidation = [
    check('name', 'El nombre del superhéroe es requerido').not().isEmpty(),
    check('alterEgo', 'El alter ego es requerido').not().isEmpty(),
    check('powers', 'Los poderes son requeridos').isArray().notEmpty(),
    check('description', 'La descripción es requerida').not().isEmpty(),
    check('creator', 'El creador es requerido').isMongoId()
];

exports.creatorValidation = [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('company', 'La compañía es requerida').not().isEmpty(),
    check('yearsOfExperience', 'Los años de experiencia son requeridos').isNumeric()
]; 