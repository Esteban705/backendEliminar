const Creator = require('../models/Creator');

class CreatorService {
    async getAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const creators = await Creator.find()
            .skip(skip)
            .limit(limit);

        const total = await Creator.countDocuments();

        return {
            data: creators,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total
            }
        };
    }

    async getById(id) {
        const creator = await Creator.findById(id);
        if (!creator) {
            throw new Error('Creador no encontrado');
        }
        return creator;
    }

    async create(creatorData) {
        const creator = new Creator(creatorData);
        await creator.save();
        return creator;
    }

    async update(id, creatorData) {
        const creator = await Creator.findByIdAndUpdate(
            id,
            creatorData,
            { new: true }
        );

        if (!creator) {
            throw new Error('Creador no encontrado');
        }

        return creator;
    }

    async delete(id) {
        const creator = await Creator.findByIdAndDelete(id);
        if (!creator) {
            throw new Error('Creador no encontrado');
        }
        return creator;
    }
}

module.exports = new CreatorService();