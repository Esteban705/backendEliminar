const mongoose = require('mongoose');

const superheroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    alterEgo: {
        type: String,
        required: true
    },
    powers: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Superhero', superheroSchema); 