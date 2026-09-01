const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    pointsRemaining: { type: Number, required: true },
    playersRemaining: { type: Number, required: true },
    maxGold: { type: Number, required: true },
    minDiamond: { type: Number, required: true },
    minPlatinum: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Team', teamSchema);
