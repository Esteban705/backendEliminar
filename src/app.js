const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { logger } = require('./config/logger');
const routes = require('./routes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Rutas
app.use('/api', routes);

// Iniciar conexión a MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Servidor corriendo en puerto ${PORT}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
    logger.error('Error no manejado:', err);
    process.exit(1);
});