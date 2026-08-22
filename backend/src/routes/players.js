const express = require('express');
const playerService = require('../services/playerService');
const validateApiKey = require('../middleware/validateApiKey');

function createPlayerRouter(pool) {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      const data = await playerService.getAllPlayers(pool);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', validateApiKey, async (req, res, next) => {
    try {
      await playerService.replaceAllPlayers(req.body.data, pool);
      res.json({ message: 'Data stored successfully' });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = {
  mainPlayersRouter: createPlayerRouter('main'),
  randomPlayersRouter: createPlayerRouter('random'),
};
