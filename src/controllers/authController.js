const { validationResult } = require('express-validator');
const authService = require('../services/authService');
const { logger } = require('../config/logger');

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { token, user } = await authService.register(req.body);
        user.set('password', undefined)
        res.status(201).json({ token, user });
    } catch (error) {
        logger.error('Error en registro:', error);
        res.status(error.message === 'El usuario ya existe' ? 400 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { token, user } = await authService.login(req.body);
        user.set('password', undefined)
        res.json({ token, user });
    } catch (error) {
        logger.error('Error en login:', error);
        res.status(error.message === 'Credenciales inválidas' ? 400 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};