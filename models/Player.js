const mongoose = require('mongoose');

const PlayersSchema = new mongoose.Schema({
  Players: { type: Array, required: true },
});

module.exports= mongoose.model('Players',PlayersSchema)