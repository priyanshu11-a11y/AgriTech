const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  variety: { type: String, default: '' },
  quantity: { type: Number, default: 0 },
  plantedDate: { type: Date },
  harvestDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crop', CropSchema);
