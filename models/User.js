const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  type: { type: String, required: true },
  gmail: { type: String, required: true},
  phoneNumber: { type: String, required: true, unique: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema); 