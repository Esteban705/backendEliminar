const { validationResult } = require('express-validator');
const superheroService = require('../services/superheroService');
const { logger } = require('../config/logger');

exports.getSuperheros = async (req, res) => {
    try {
        logger.info('Obteniendo lista de superhéroes', {
            page: req.query.page,
            limit: req.query.limit
        });

        const result = await superheroService.getAll(
            parseInt(req.query.page),
            parseInt(req.query.limit)
        );

        logger.info('Superhéroes obtenidos exitosamente', {
            count: result.data.length,
            pagination: result.pagination
        });

        res.json(result);
    } catch (error) {
        logger.error('Error obteniendo superhéroes:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.getSuperheroById = async (req, res) => {
    try {
        logger.info('Buscando superhéroe por ID', { id: req.params.id });

        const superhero = await superheroService.getById(req.params.id);

        logger.info('Superhéroe encontrado exitosamente', {
            superheroId: superhero._id,
            superheroName: superhero.name
        });

        res.json(superhero);
    } catch (error) {
        logger.error('Error obteniendo superhéroe:', error);
        res.status(error.message === 'Superhéroe no encontrado' ? 404 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};

exports.createSuperhero = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validación fallida al crear superhéroe', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        logger.info('Creando nuevo superhéroe', {
            superheroData: { ...req.body, password: undefined }
        });

        const superhero = await superheroService.create(req.body);

        logger.info('Superhéroe creado exitosamente', {
            superheroId: superhero._id,
            superheroName: superhero.name
        });

        res.status(201).json(superhero);
    } catch (error) {
        logger.error('Error creando superhéroe:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.updateSuperhero = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validación fallida al actualizar superhéroe', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        logger.info('Actualizando superhéroe', {
            id: req.params.id,
            updateData: req.body
        });

        const superhero = await superheroService.update(req.params.id, req.body);

        logger.info('Superhéroe actualizado exitosamente', {
            superheroId: superhero._id,
            superheroName: superhero.name
        });

        res.json(superhero);
    } catch (error) {
        logger.error('Error actualizando superhéroe:', error);
        res.status(error.message === 'Superhéroe no encontrado' ? 404 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};

exports.deleteSuperhero = async (req, res) => {
    try {
        logger.info('Eliminando superhéroe', { id: req.params.id });

        await superheroService.delete(req.params.id);

        logger.info('Superhéroe eliminado exitosamente', { id: req.params.id });

        res.json({ message: 'Superhéroe eliminado exitosamente' });
    } catch (error) {
        logger.error('Error eliminando superhéroe:', error);
        res.status(error.message === 'Superhéroe no encontrado' ? 404 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};