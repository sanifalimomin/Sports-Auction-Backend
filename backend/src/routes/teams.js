const express = require('express');
const teamService = require('../services/teamService');
const validateApiKey = require('../middleware/validateApiKey');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await teamService.getAllTeams();
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

router.post('/', validateApiKey, async (req, res, next) => {
  try {
    await teamService.replaceAllTeams(req.body.data);
    res.json({ message: 'Data stored successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
