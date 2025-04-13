const { User, NiveauxSpecialite } = require('../models');

const registerUser = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const {
            uid,
            fullName,
            userName,
            email,
            dob,
            niveau,
            specialite
        } = req.body;

        const niveauxSpecialite = await NiveauxSpecialite.findOne({
            where: {
                niveauId: niveau,
                specialiteId: specialite
            }
        });

        console.log('NiveauxSpecialite:', niveauxSpecialite);

        if (!niveauxSpecialite) {
            return res.status(400).json({ message: 'NiveauxSpecialite not found' });
        }

        const userData = {
            id: uid,
            fullName: fullName,
            userName: userName,
            email: email,
            dob: dob,
            niveauxSpecialiteId: niveauxSpecialite.id, // Use niveauxSpecialite.id
        };

        const user = await User.create(userData);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
};
const getUser = async (req, res) => {const { id } = req.params;

try {
    const user = await User.findOne({ where: { id: id } });
    if (user) {
        return res.status(200).json({ exists: true , user: user });
    } else {
        return res.status(200).json({ exists: false });
    }
} catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ message: 'Failed to check user existence', error: error.message });
}
}
module.exports = {
    registerUser,
    getUser
};