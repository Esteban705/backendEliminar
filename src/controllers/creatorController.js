const { validationResult } = require('express-validator');
const creatorService = require('../services/creatorService');
const { logger } = require('../config/logger');

exports.getCreators = async (req, res) => {
    try {
        logger.info('Obteniendo lista de creadores');

        const result = await creatorService.getAll(
            parseInt(req.query.page),
            parseInt(req.query.limit)
        );

        logger.info('Creadores obtenidos exitosamente');

        res.json(result);
    } catch (error) {
        logger.error('Error obteniendo creadores:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.getCreatorById = async (req, res) => {
    try {
        logger.info('Buscando creador por ID', { id: req.params.id });

        const creator = await creatorService.getById(req.params.id);

        logger.info('Creador encontrado exitosamente');

        res.json(creator);
    } catch (error) {
        logger.error('Error obteniendo creador:', error);
        res.status(error.message === 'Creador no encontrado' ? 404 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};

exports.createCreator = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validación fallida al crear creador', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        logger.info('Creando nuevo creador');

        const creator = await creatorService.create(req.body);

        logger.info('Creador creado exitosamente');

        res.status(201).json(creator);
    } catch (error) {
        logger.error('Error creando creador:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.updateCreator = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validación fallida al actualizar creador', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        logger.info('Actualizando creador', {
            id: req.params.id,
            updateData: req.body
        });

        const creator = await creatorService.update(req.params.id, req.body);

        logger.info('Creador actualizado exitosamente');

        res.json(creator);
    } catch (error) {
        logger.error('Error actualizando creador:', error);
        res.status(error.message === 'Creador no encontrado' ? 404 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};

exports.deleteCreator = async (req, res) => {
    try {
        logger.info('Eliminando creador', { id: req.params.id });

        await creatorService.delete(req.params.id);

        logger.info('Creador eliminado exitosamente', { id: req.params.id });

        res.json({ message: 'Creador eliminado exitosamente' });
    } catch (error) {
        logger.error('Error eliminando creador:', error);
        res.status(error.message === 'Creador no encontrado' ? 404 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};