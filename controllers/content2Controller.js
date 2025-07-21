const Content2 = require('../models/Content2');

// Get all content2
exports.getAll = async (req, res) => {
  try {
    const items = await Content2.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one content2 by id
exports.getOne = async (req, res) => {
  try {
    const item = await Content2.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upsert content2 by title
exports.upsert = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    let item = await Content2.findOne({ title });
    if (item) {
      item.content = content;
      await item.save();
      return res.json(item);
    } else {
      item = new Content2({ title, content });
      await item.save();
      return res.status(201).json(item);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete content2 by id
exports.remove = async (req, res) => {
  try {
    const item = await Content2.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 