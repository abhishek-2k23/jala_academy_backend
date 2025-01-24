import User from '../models/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
    try {
        const { id, email, password, name, role } = req.body;

        // Check for required data
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Missing data',
            });
        }
        //check for already registered user
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            return res.status(302).json({
                status: false,
                message: "you are already register",
            })
        }
        
        // Encrypt the password
        const encrypted_password = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'));

        // Create a new user instance
        const updatedUser = new User({
            id,
            email,
            password: encrypted_password,
            name,
            role,
        });

        // Save the user
        const saved_user = await updatedUser.save();

        return res.status(200).json({
            status: true,
            message: 'User created successfully',
            user: saved_user,
        });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            status: false,
            message: 'Server error',
        });
    }
};
