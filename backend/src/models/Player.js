const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    fullName: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    points: { type: Number, required: true, default: 0 },
    allocated: { type: Number, required: true, default: 0 },
    teamId: { type: Number, required: true, default: 0 },
    role: { type: String, required: true, trim: true },
    picture: { type: String, default: '' },
    category: { type: String, required: true, trim: true },
    pool: { type: String, enum: ['main', 'random'], required: true },
  },
  { versionKey: false }
);

playerSchema.index({ id: 1, pool: 1 }, { unique: true });

module.exports = mongoose.model('Player', playerSchema);
