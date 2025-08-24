const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'a-very-secret-key-that-should-be-in-env';

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });

const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // keep false in dev
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

const registerStudent = async (req, res) => {
  const {
    fullName,
    username,
    email,
    password,
    phoneNumber,
    address, // UI maps City -> address
    university,
    department,
    academicYear,
    studentId,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = await User.create({
      fullName,
      username,
      email,
      password, // hashed by pre-save
      role: 'Student',
      status: 'Approved',
      phoneNumber,
      address,
      university,
      department,
      academicYear,
      studentId,
    });

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

const registerOrganizer = async (req, res) => {
  const {
    fullName,
    username,
    email,
    password,
    phoneNumber,
    address,
    university,
    clubName,
    clubPosition,
    clubWebsite,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: 'An account with this email already exists or is pending approval.' });
    }

    const user = await User.create({
      fullName,
      username,
      email,
      password,
      role: 'Organizer',
      status: 'Pending',
      phoneNumber,
      address,
      university,
      clubName,
      clubPosition,
      clubWebsite,
    });

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    return res
      .status(201)
      .json({ message: 'Registration successful! Your application is now pending approval.', token });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error: ' + error.message });
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

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// Clear auth cookie
const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  return res.status(200).json({ message: 'Logged out' });
};

// NEW: return current authenticated user (middleware attaches req.user)
const getMe = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  return res.json(req.user); // password already excluded in middleware
};

module.exports = {
  registerStudent,
  registerOrganizer,
  loginUser,
  logoutUser,
  getMe, // <-- make sure this is exported
};
