const mongoose = require('mongoose');

const content2Schema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Content2', content2Schema); 