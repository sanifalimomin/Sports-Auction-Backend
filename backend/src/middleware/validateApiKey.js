const config = require('../config');

function validateApiKey(req, res, next) {
  if (!config.apiKey) {
    return next();
  }

  const headerKey = req.headers['x-api-key'];
  const authHeader = req.headers.authorization;
  const bearerKey =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.slice('Bearer '.length)
      : undefined;

  const providedKey = headerKey || bearerKey;

  if (!providedKey || providedKey !== config.apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return next();
}

module.exports = validateApiKey;
