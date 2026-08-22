class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

function requireArray(value, fieldName) {
  if (!Array.isArray(value)) {
    throw new ValidationError(`${fieldName} must be an array`);
  }
}

function requireNumber(value, fieldName) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new ValidationError(`${fieldName} must be a number`);
  }
}

function requireString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new ValidationError(`${fieldName} must be a non-empty string`);
  }
}

function validateTeams(data) {
  requireArray(data, 'data');

  const seenIds = new Set();

  data.forEach((team, index) => {
    if (!team || typeof team !== 'object') {
      throw new ValidationError(`data[${index}] must be an object`);
    }

    requireNumber(team.id, `data[${index}].id`);
    requireString(team.name, `data[${index}].name`);
    requireNumber(team.pointsRemaining, `data[${index}].pointsRemaining`);
    requireNumber(team.playersRemaining, `data[${index}].playersRemaining`);
    requireNumber(team.maxGold, `data[${index}].maxGold`);
    requireNumber(team.minDiamond, `data[${index}].minDiamond`);
    requireNumber(team.minPlatinum, `data[${index}].minPlatinum`);

    if (seenIds.has(team.id)) {
      throw new ValidationError(`Duplicate team id: ${team.id}`);
    }
    seenIds.add(team.id);
  });
}

function validatePlayers(data) {
  requireArray(data, 'data');

  const seenIds = new Set();

  data.forEach((player, index) => {
    if (!player || typeof player !== 'object') {
      throw new ValidationError(`data[${index}] must be an object`);
    }

    requireNumber(player.id, `data[${index}].id`);
    requireString(player.fullName, `data[${index}].fullName`);
    requireString(player.name, `data[${index}].name`);
    requireNumber(player.points, `data[${index}].points`);
    requireNumber(player.allocated, `data[${index}].allocated`);
    requireNumber(player.teamId, `data[${index}].teamId`);
    requireString(player.role, `data[${index}].role`);
    requireString(player.category, `data[${index}].category`);

    if (player.picture !== undefined && typeof player.picture !== 'string') {
      throw new ValidationError(`data[${index}].picture must be a string`);
    }

    if (![0, 1, 2].includes(player.allocated)) {
      throw new ValidationError(
        `data[${index}].allocated must be 0 (unallocated), 1 (drop), or 2 (allocated)`
      );
    }

    if (seenIds.has(player.id)) {
      throw new ValidationError(`Duplicate player id: ${player.id}`);
    }
    seenIds.add(player.id);
  });
}

module.exports = {
  ValidationError,
  validateTeams,
  validatePlayers,
};
