require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 8080,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sports-auction',
  apiKey: process.env.API_KEY,
  allowedOrigin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  bodyLimit: '10mb',
};
