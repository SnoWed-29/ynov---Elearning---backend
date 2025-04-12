const niveau = require('../models/Niveau');
const specialite = require('../models/Specialite');
const NiveauxSpecialite = require('../models/NiveauxSpecialite');

const getAllLevels = async (req, res) => {
    try {
        const levels = await niveau.findAll();

        res.status(200).json({
            message: 'All levels',
            levels
        });
    } catch (error) {
        console.error('Error fetching levels:', error);
        res.status(500).json({ message: 'Failed to fetch levels', error: error.message });
    }
}
const getAllSpecialities = async (req, res) => {
    const { levelId } = req.query;

    if (!levelId) {
        return res.status(400).json({ message: 'Level ID is required' });
    }

    try {
        const data = await niveau.findOne({
            where: {
                id: levelId,
            },
            include: [
                {
                    model: specialite,
                    as: 'specialites', // Use the alias defined in the association
                    attributes: ['id', 'specialityName'],
                    through: { attributes: [] }
                }
            ]
        });

        if (!data) {
            return res.status(404).json({ message: 'Level not found' });
        }

        res.status(200).json({
            message: 'Specialities for Level',
            data: data.specialites // Return the specialities array
        });
    } catch (error) {
        console.error('Error fetching specialities:', error);
        res.status(500).json({ message: 'Failed to fetch specialities', error: error.message });
    }
}

module.exports = {
    getAllLevels,
    getAllSpecialities
}