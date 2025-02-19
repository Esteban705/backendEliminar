const express = require('express');
const router = express.Router();
const {
    getSuperheros,
    getSuperheroById,
    createSuperhero,
    updateSuperhero,
    deleteSuperhero
} = require('../controllers/superheroController');
const { superheroValidation } = require('../middleware/validator');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getSuperheros);
router.get('/:id', getSuperheroById);
router.post('/', [authMiddleware, superheroValidation], createSuperhero);
router.put('/:id', [authMiddleware, superheroValidation], updateSuperhero);
router.delete('/:id', authMiddleware, deleteSuperhero);

module.exports = router;