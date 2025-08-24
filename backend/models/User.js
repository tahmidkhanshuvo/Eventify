const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  address: { type: String },
  university: {
    type: String,
    required: function() { return this.role === 'Student' || this.role === 'Organizer'; }
  },
  role: { type: String, enum: ['Student', 'Organizer', 'Super Admin'], required: true },
  status: { type: String, enum: ['Pending', 'Approved'], default: 'Approved' },

  // Student-specific
  department: { type: String, required: function() { return this.role === 'Student'; } },
  academicYear: { type: String, required: function() { return this.role === 'Student'; } },
  studentId: { type: String, required: function() { return this.role === 'Student'; } },

  // Organizer-specific
  clubName: { type: String, required: function() { return this.role === 'Organizer'; } },
  clubPosition: { type: String, required: function() { return this.role === 'Organizer'; } },
  clubWebsite: { type: String },

  // Club branding (NEW)
  clubLogoUrl: { type: String, default: '' },
  clubLogoFileId: { type: String, default: '' },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) { next(error); }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
