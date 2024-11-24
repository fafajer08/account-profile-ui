// /models/userProfile.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  mobileNumber: { type: String },
  twoFA: { type: String },
  vacationMode: { type: Boolean },
});

// Hash the password before saving
userProfileSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
