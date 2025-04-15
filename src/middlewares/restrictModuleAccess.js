const user = require('../models/User');
const niveauxSpecialite = require('../models/NiveauxSpecialite');
const modulee = require('../models/Modulee');
const sequelize = require('../config/db');
const specialiteModule = require('../models/SpeciaModule');
 // Adjust according to your models
const { Op } = require('sequelize');

const restrictModuleAccess = async (req, res, next) => {
    try {
        const { userId } = req.body; // Assuming userId is in the body; adjust if it's in req.user (e.g., from JWT)
        const { moduleId } = req.params; // Assuming moduleId is in the URL params (e.g., /modules/:moduleId)

        // Validate inputs
        if (!userId || !moduleId) {
            return res.status(400).json({ message: 'User ID and Module ID are required' });
        }

        // Find the user
        const userData = await user.findOne({ where: { id: userId } });
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the user's niveauxSpecialite
        const niveauxSpecialiteData = await niveauxSpecialite.findOne({
            where: { id: userData.niveauxSpecialiteId },
        });
        if (!niveauxSpecialiteData) { 
            return res.status(404).json({ message: 'NiveauxSpecialite not found' });
        }

        const { niveauId, specialiteId } = niveauxSpecialiteData;

        // Check if the module is accessible (either specialty-related or global)
        const moduleData = await modulee.findOne({
            where: {
                id: moduleId,
                [Op.or]: [
                    // Module is related to the user's specialty
                    {
                        id: {
                            [Op.in]: sequelize.literal(`(
                                SELECT moduleId 
                                FROM SpecialModules 
                                WHERE specialiteId = ${specialiteId}
                            )`)
                        },
                        niveauId, // Match the user's niveauId
                    },
                    // Module is global
                    {
                        niveauId, // Match the user's niveauId
                        isGlobal: true, // Global module
                    }
                ]
            }
        });

        if (!moduleData) {
            return res.status(403).json({ message: 'Access to this module is restricted' });
        }

        // If the module is accessible, proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = restrictModuleAccess;