require('dotenv').config();

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../src/config');
const teamService = require('../src/services/teamService');
const playerService = require('../src/services/playerService');

const seedDir = path.join(__dirname, '..', 'data', 'seed');

function readJson(fileName) {
  const filePath = path.join(seedDir, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

async function seed() {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    const teams = readJson('teams.sample.json');
    const players = readJson('players.sample.json');

    await teamService.replaceAllTeams(teams);
    await playerService.replaceAllPlayers(players, 'main');
    await playerService.replaceAllPlayers(players.slice(0, 5), 'random');

    console.log(`Seeded ${teams.length} teams, ${players.length} main players, and 5 random players`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
