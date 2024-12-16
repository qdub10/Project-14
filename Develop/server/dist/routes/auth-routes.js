import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log('Login request body:', req.body); // Log the request body
    try {
        const user = await User.findOne({ where: { username } });
        console.log('User from DB:', user); // Log user data from the database
        if (!user) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password match:', isPasswordValid); // Log password comparison result
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const router = Router();
router.post('/login', login);
export default router;
