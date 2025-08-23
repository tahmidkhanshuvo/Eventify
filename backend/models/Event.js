const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Workshop', 'Seminar', 'Guest Lecture', 'Networking Event', 'Hackathon', 'Competition', 'Career Fair',
            'Cultural Fest', 'Music Concert', 'Art Exhibition', 'Movie Night', 'Social Mixer', 'Food Festival',
            'Sports Tournament', 'Fitness Session', 'Outdoor Trip', 'Marathon', 'E-Sports Competition',
            'Charity Drive', 'Volunteer Day', 'Awareness Campaign', 'Club Meeting', 'Info Session'
        ]
    },
    imageUrl: {
        type: String,
        default: ''
    },
    capacity: {
        type: Number,
        min: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
