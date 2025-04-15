const niveau = require('../models/Niveau');
const modulee = require('../models/Modulee');
const niveauxSpecialite = require('../models/NiveauxSpecialite');
const specialiteModule = require('../models/SpeciaModule'); 
const user = require('../models/User');
const { Op } = require('sequelize')
const sequelize = require('../config/db'); // Adjust the path to your database configuration 
const chapter = require('../models/Chapter'); // Adjust the path to your Chapters model
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


const getModuleById = async (req, res) => {
    try {
        const { moduleId } = req.params;

        const moduleData = await modulee.findOne({
            where: { id: moduleId },
            include: [
                {
                    model: chapter, // Adjust the path to your Chapters model
                    as: 'chapters', // Alias defined in the relationship
                    attributes: ['id', 'chapterName', 'description', 'order'] // Specify the fields you want to include
                }
            ]
        });

        if (!moduleData) {
            return res.status(404).json({ message: 'Module not found' });
        }

        return res.status(200).json(moduleData); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const getChapter =  async (req, res) => {
    const { moduleId, chapterId } = req.params;
  
    try {
      // Fetch the module by ID
      const  course = await modulee.findByPk(moduleId, {
        include: [
          {
            model: chapter,
            as: 'chapters',
            where: { id: chapterId },
          },
        ],
      });
  
      if (!course || !course.chapters || course.chapters.length === 0) {
        return res.status(404).json({ message: 'Chapter not found' });
      }
  
      // Return the specific chapter
      res.json(course.chapters[0]);
    } catch (error) {
      console.error('Error fetching chapter:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const getChapterById = async(req,res) => {
    const {chapterId, moduleId} = req.params;

    try{
        const chapterData = await chapter.findOne({
            where: { id: chapterId },
            include: [
                {
                  model: modulee,
                  as: 'module',
                  where: { id: moduleId },
                  attributes: ['id', 'moduleName', 'description'] // Specify the fields to include
                },
              ],
        });

        if (!chapterData) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        return res.status(200).json(chapterData);
    }catch(error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { 
    getUsersModulesList, 
    getModuleById, 
    getChapter,
    getChapterById 
};