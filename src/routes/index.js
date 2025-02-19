const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const superheroRouter = require('./superheroRouter');
const creatorRouter = require('./creatorRouter');

// Rutas principales
router.use('/auth', authRouter);
router.use('/superheros', superheroRouter);
router.use('/creators', creatorRouter);

module.exports = router;