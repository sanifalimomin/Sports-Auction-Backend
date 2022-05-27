const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  teams: { type: Array, required: true },
});

module.exports= mongoose.model('Teams',TeamSchema)