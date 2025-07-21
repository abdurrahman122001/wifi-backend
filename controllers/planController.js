// planController.js
const Plan = require('../models/Plan');

// Get all plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const { title, price, discount, details, extra } = req.body;
    const plan = new Plan({ title, price, discount, details, extra });
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a plan
exports.updatePlan = async (req, res) => {
  try {
    const { title, price, discount, details, extra } = req.body;
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { title, price, discount, details, extra },
      { new: true, runValidators: true }
    );
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a plan
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 