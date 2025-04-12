const { User } = require('../models');

const registerUser = async (req, res) => {
    try {
        const { fullName, userName, email, dob, profile_picture, niveauxSpecialiteId } = req.body;       
        const user = await User.create({
            fullName,
            userName,
            email,
            dob,
            profile_picture,
            niveauxSpecialiteId
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
};

module.exports = {
    registerUser
};