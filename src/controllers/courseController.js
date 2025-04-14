const niveau = require('../models/Niveau');
const modulee = require('../models/Modulee');
const niveauxSpecialite = require('../models/NiveauxSpecialite');
const specialiteModule = require('../models/SpeciaModule'); // Assuming this model exists
const user = require('../models/User');
const { Op, Sequelize } = require('sequelize'); // Import Op and Sequelize
const sequelize = require('../config/db'); // Adjust the path to your Sequelize instance
const getUsersModulesList = async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the user
        const userData = await user.findOne({ where: { id: userId } });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the niveauxSpecialite data
        const niveauxSpecialiteData = await niveauxSpecialite.findOne({
            where: { id: userData.niveauxSpecialiteId },
            include: [
                {
                    model: niveau,
                    as: 'niveau',
                    attributes: ['id', 'levelName']
                }
            ]
        });

        if (!niveauxSpecialiteData) {
            return res.status(404).json({ message: 'NiveauxSpecialite not found' });
        }

        const { niveauId, specialiteId } = niveauxSpecialiteData;

        // Retrieve modules with the same niveauId and exist in SpecialiteModule with the same specialiteId
        const relatedModules = await modulee.findAll({
            where: {
                [Op.and]: [
                    { niveauId }, // Match the user's niveauId
                    {
                        id: {
                            [Op.in]: sequelize.literal(`(
                                SELECT moduleId 
                                FROM SpecialModules 
                                WHERE specialiteId = ${specialiteId}
                            )`)
                        }
                    }
                ]
            },
            logging: console.log // Log the generated SQL query for debugging
        });

        // Retrieve modules with the same niveauId and isGlobal set to true
        const globalModules = await modulee.findAll({
            where: {
                [Op.and]: [
                    { niveauId }, // Match the user's niveauId
                    { isGlobal: true } // isGlobal is true
                ]
            }
        });

        // Return both sets of modules in the response
        return res.status(200).json({
            relatedModules, // Modules related to the user's specialite
            globalModules   // Modules with isGlobal set to true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getUsersModulesList };