const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Student', 'Organizer', 'Super Admin'],
        required: true
    },
    mobileNumber: { type: String },
    address: { type: String },
    status: {
        type: String,
        enum: ['Pending', 'Approved'],
        default: 'Approved'
    },
    // Student-specific fields
    university: {
        type: String,
        required: function() { return this.role === 'Student'; }
    },
    department: {
        type: String,
        required: function() { return this.role === 'Student'; }
    },
    semester: {
        type: String,
        required: function() { return this.role === 'Student'; }
    },
    // Organizer-specific fields
    clubName: {
        type: String,
        required: function() { return this.role === 'Organizer'; }
    },
    position: {
        type: String,
        required: function() { return this.role === 'Organizer'; }
    }
}, { timestamps: true });

// Middleware to hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
