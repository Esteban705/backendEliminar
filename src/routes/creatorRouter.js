const express = require('express');
const router = express.Router();
const {
    getCreators,
    getCreatorById,
    createCreator,
    updateCreator,
    deleteCreator
} = require('../controllers/creatorController');
const { creatorValidation } = require('../middleware/validator');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getCreators);
router.get('/:id', getCreatorById);
router.post('/', [authMiddleware, creatorValidation], createCreator);
router.put('/:id', [authMiddleware, creatorValidation], updateCreator);
router.delete('/:id', authMiddleware, deleteCreator);

module.exports = router;