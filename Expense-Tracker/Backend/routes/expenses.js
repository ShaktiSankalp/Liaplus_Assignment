const express = require('express');
const Expense = require('../models/Expense');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

// Create
router.post('/', requireAuth, async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, user: req.userId });
    await expense.save();
    res.status(201).send(expense);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read
router.get('/', requireAuth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId });
    res.send(expenses);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!expense) return res.status(404).send({ message: 'Expense not found' });
    res.send(expense);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    if (!expense) return res.status(404).send({ message: 'Expense not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
