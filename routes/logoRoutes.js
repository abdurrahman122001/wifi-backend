const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads/logo');
const logoBase = path.join(uploadDir, 'logo');

// Multer setup: accept any file, but always save as 'logo' with original extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, 'logo' + '.jpg');
  },
});
const upload = multer({ storage });

// GET /api/logo - serve the logo image if exists
router.get('/', (req, res) => {
  const files = fs.readdirSync(uploadDir).filter(f => f.startsWith('logo.'));
  if (files.length === 0) return res.status(404).json({ message: 'Logo not found' });
  const logoPath = path.join(uploadDir, files[0]);
  res.sendFile(logoPath);
});

// POST /api/logo - upload/replace logo image
router.post('/', upload.single('logo'), (req, res) => {
  // Remove any existing logo files
  fs.readdirSync(uploadDir).forEach(f => {
    if (f.startsWith('logo.') && (!req.file || f !== req.file.filename)) {
      fs.unlinkSync(path.join(uploadDir, f));
    }
  });
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// DELETE /api/logo - delete the logo image
router.delete('/', (req, res) => {
  const files = fs.readdirSync(uploadDir).filter(f => f.startsWith('logo.'));
  if (files.length === 0) return res.status(404).json({ message: 'Logo not found' });
  fs.unlinkSync(path.join(uploadDir, files[0]));
  res.json({ message: 'Logo deleted' });
});

module.exports = router; 