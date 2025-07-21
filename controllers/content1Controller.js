const Content1 = require('../models/Content1');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { log } = require('console');

// List all content
exports.getAll = async (req, res) => {
  try {
    const items = await Content1.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one content
exports.getOne = async (req, res) => {
  try {
    const item = await Content1.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create content (with image upload)
exports.create = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image is required' });
    const { title, subtitle, description } = req.body;
    const item = new Content1({
      image: req.file.filename,
      title,
      subtitle,
      description,
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update content (with optional image)
exports.update = async (req, res) => {
  try {
    const item = await Content1.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    const { title, subtitle, description } = req.body;
    if (req.file) {
      // Delete old image
      const oldPath = path.join(__dirname, '../uploads', item.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      item.image = req.file.filename;
    }
    item.title = title;
    item.subtitle = subtitle;
    item.description = description;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete content (and image)
exports.remove = async (req, res) => {
  try {
    const item = await Content1.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    const imgPath = path.join(__dirname, '../uploads', item.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    await item.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 