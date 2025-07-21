// planRoutes.js
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

// Create a new plan
router.post('/', planController.createPlan);
// Get all plans
router.get('/', planController.getPlans);
// Update a plan
router.put('/:id', planController.updatePlan);
// Delete a plan
router.delete('/:id', planController.deletePlan);

module.exports = router; 