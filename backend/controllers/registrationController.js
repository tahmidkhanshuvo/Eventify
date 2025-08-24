const Registration = require('../models/Registration');

const getMyRegisteredEvents = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user._id })
            .populate({
                path: 'event',
                populate: {
                    path: 'createdBy',
                    select: 'username clubName'
                }
            })
            .sort({ 'event.date': 1 });

        const events = registrations.map(r => r.event);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = {
    getMyRegisteredEvents,
};