const Team = require('../models/Team');
const { validateTeams } = require('./validation');

function toTeamResponse(team) {
  return {
    id: team.id,
    name: team.name,
    pointsRemaining: team.pointsRemaining,
    playersRemaining: team.playersRemaining,
    maxGold: team.maxGold,
    minDiamond: team.minDiamond,
    minPlatinum: team.minPlatinum,
  };
}

async function getAllTeams() {
  const teams = await Team.find().sort({ id: 1 }).lean();
  return teams.map(toTeamResponse);
}

async function replaceAllTeams(data) {
  validateTeams(data);

  await Team.deleteMany({});
  if (data.length > 0) {
    await Team.insertMany(data);
  }
}

module.exports = {
  getAllTeams,
  replaceAllTeams,
};
