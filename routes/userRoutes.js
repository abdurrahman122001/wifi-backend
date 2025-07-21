const express = require('express');
const router = express.Router();
const { 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUserStatus,
  deleteUser
} = require('../controllers/userController');

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

// Update user status
router.patch('/:id/status', updateUserStatus);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router; 