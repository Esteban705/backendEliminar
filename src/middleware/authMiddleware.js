const jwt = require('jsonwebtoken');
const { logger } = require('../config/logger');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        logger.error('Error de autenticación:', error);
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;