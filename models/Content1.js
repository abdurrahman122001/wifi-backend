const mongoose = require('mongoose');

const content1Schema = new mongoose.Schema({
  image: { type: String, required: true }, // filename or URL
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Content1', content1Schema); 