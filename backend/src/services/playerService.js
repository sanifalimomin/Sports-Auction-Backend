const Player = require('../models/Player');
const { validatePlayers } = require('./validation');

function toPlayerResponse(player) {
  return {
    id: player.id,
    fullName: player.fullName,
    name: player.name,
    points: player.points,
    allocated: player.allocated,
    teamId: player.teamId,
    role: player.role,
    picture: player.picture || '',
    category: player.category,
  };
}

async function getAllPlayers(pool) {
  const players = await Player.find({ pool }).sort({ id: 1 }).lean();
  return players.map(toPlayerResponse);
}

async function replaceAllPlayers(data, pool) {
  validatePlayers(data);

  await Player.deleteMany({ pool });
  if (data.length > 0) {
    const documents = data.map((player) => ({
      ...player,
      picture: player.picture || '',
      pool,
    }));
    await Player.insertMany(documents);
  }
}

module.exports = {
  getAllPlayers,
  replaceAllPlayers,
};
