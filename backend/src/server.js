const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const teamsRouter = require('./routes/teams');
const { mainPlayersRouter, randomPlayersRouter } = require('./routes/players');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: config.allowedOrigin,
  })
);
app.use(express.json({ limit: config.bodyLimit }));

app.use('/teams', teamsRouter);
app.use('/players', mainPlayersRouter);
app.use('/random-players', randomPlayersRouter);

app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
