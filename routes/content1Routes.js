const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const content1Controller = require('../controllers/content1Controller');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  },
});
const upload = multer({ storage });

router.get('/', content1Controller.getAll);
router.post('/', upload.single('image'), content1Controller.create);
router.put('/:id', upload.single('image'), content1Controller.update);
router.delete('/:id', content1Controller.remove);

module.exports = router; 