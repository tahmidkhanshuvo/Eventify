const User = require('../models/User');
const nodemailer = require('nodemailer');

const sendApprovalEmail = async (email, tempPassword) => {
    // This is a simulation and will only log to the console.
    // In production, you would configure a real email service.
    console.log('--- SIMULATING EMAIL ---');
    console.log(`To: ${email}`);
    console.log(`Subject: Your Organizer Account has been Approved!`);
    console.log(`Body: Congratulations! Your organizer account has been approved. You can now log in with your email and this temporary password: ${tempPassword}`);
    console.log('------------------------');
};

const getOrganizerRequests = async (req, res) => {
    try {
        const requests = await User.find({ role: 'Organizer', status: 'Pending' }).select('-password');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

const approveOrganizerRequest = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user && user.role === 'Organizer' && user.status === 'Pending') {
            const tempPassword = Math.random().toString(36).slice(-8);
            user.password = tempPassword;
            user.status = 'Approved';
            await user.save();
            await sendApprovalEmail(user.email, tempPassword);
            res.json({ message: `Organizer ${user.username} approved successfully.` });
        } else {
            res.status(404).json({ message: 'Pending organizer request not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

const rejectOrganizerRequest = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user && user.role === 'Organizer' && user.status === 'Pending') {
            await user.deleteOne();
            res.json({ message: 'Organizer request rejected and user removed.' });
        } else {
            res.status(404).json({ message: 'Pending organizer request not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = {
    getOrganizerRequests,
    approveOrganizerRequest,
    rejectOrganizerRequest,
};