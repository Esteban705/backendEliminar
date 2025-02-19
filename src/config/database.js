const mongoose = require('mongoose');
const { logger } = require('./logger');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        logger.info(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        logger.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;