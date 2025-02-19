const Superhero = require('../models/Superhero');

class SuperheroService {
    async getAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const superheros = await Superhero.find()
            .populate('creator', 'name company')
            .skip(skip)
            .limit(limit);

        const total = await Superhero.countDocuments();

        return {
            data: superheros,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total
            }
        };
    }

    async getById(id) {
        const superhero = await Superhero.findById(id).populate('creator', 'name company');
        if (!superhero) {
            throw new Error('Superhéroe no encontrado');
        }
        return superhero;
    }

    async create(superheroData) {
        const superhero = new Superhero(superheroData);
        await superhero.save();
        return superhero;
    }

    async update(id, superheroData) {
        const superhero = await Superhero.findByIdAndUpdate(
            id,
            superheroData,
            { new: true }
        );

        if (!superhero) {
            throw new Error('Superhéroe no encontrado');
        }

        return superhero;
    }

    async delete(id) {
        const superhero = await Superhero.findByIdAndDelete(id);
        if (!superhero) {
            throw new Error('Superhéroe no encontrado');
        }
        return superhero;
    }
}

module.exports = new SuperheroService();