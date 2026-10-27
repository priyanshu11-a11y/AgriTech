const Farm = require('../models/Farm');

exports.getAll = async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user.id });
    res.json(farms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const farms = await Farm.find().populate('userId', 'name email');
    res.json(farms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const farm = await Farm.create({ ...req.body, userId: req.user.id });
    res.status(201).json(farm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(farm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Farm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Farm deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
