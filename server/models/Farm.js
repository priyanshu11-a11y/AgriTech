const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
  farmName: { type: String, required: true },
  location: { type: String, required: true },
  areaSize: { type: Number, required: true },
  establishedDate: { type: Date },
  primaryCropType: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farm', FarmSchema);
