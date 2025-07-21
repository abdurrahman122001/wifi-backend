// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.createUser);
router.post('/login', authController.login);

router.get('/', authController.getAllUsers);
router.delete('/:id', authController.deleteUser);

module.exports = router; 