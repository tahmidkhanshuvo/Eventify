const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'a-very-secret-key-that-should-be-in-env';

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

const registerStudent = async (req, res) => {
    const { fullName, username, email, password, phoneNumber, address, university, department, academicYear, studentId } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const user = await User.create({
            fullName, username, email, password, role: 'Student', status: 'Approved',
            phoneNumber, address, university, department, academicYear, studentId
        });
        res.status(201).json({
            _id: user._id, username: user.username, email: user.email, role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

const registerOrganizer = async (req, res) => {
    const { fullName, username, email, password, phoneNumber, address, university, clubName, clubPosition, clubWebsite } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'An account with this email already exists or is pending approval.' });
        }
        await User.create({
            fullName, username, email, password, role: 'Organizer', status: 'Pending',
            phoneNumber, address, university, clubName, clubPosition, clubWebsite
        });
        res.status(201).json({ message: 'Registration successful! Your application is now pending approval.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (user.role === 'Organizer' && user.status !== 'Approved') {
            return res.status(401).json({ message: 'Your organizer account is still pending approval.' });
        }
        res.json({
            _id: user._id, username: user.username, email: user.email, role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = { registerStudent, registerOrganizer, loginUser };