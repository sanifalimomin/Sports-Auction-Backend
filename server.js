const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
app.use(bodyParser.json());
const { TEAMS, PLAYERS } = require("./constants");

const Players = require("./models/Player");
const Teams = require("./models/Team");
const Team = require("./models/Team");

mongoose.connect(
  "mongodb+srv://aagpl:click123@aagpl.hpmaw.mongodb.net/aagpl?retryWrites=true&w=majority"
);

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

function sendResponse(res, err, data) {
  if (err) {
    res.json({
      success: false,
      message: err,
    });
  } else if (!data) {
    res.json({
      success: true,
      message: "Successfully Saved",
    });
  } else {
    res.json({
      success: true,
      data: data,
    });
  }
}

// SERVER STATUS
app.get("/status", async (req, res) => {
  res.json({
    success: true,
    message: "Server Running",
  });});

// INITIALIZE TEAM
app.get("/resetTeam", (req, res) => {
  Teams.deleteMany({}, (err, data) => {
    if (!err) {
      Teams.create(
        {
          teams: TEAMS,
        },
        (err, data) => {
          sendResponse(res, err, data);
        }
      );
    }
  });
});

// INITIALIZE PLAYER
app.get("/resetPlayer", (req, res) => {
  Players.deleteMany({}, (err, data) => {
    if (!err) {
      Players.create(
        {
          Players: PLAYERS,
        },
        (err, data) => {
          sendResponse(res, err, data);
        }
      );
    }
  });
});

// UPDATE TEAM
app.post("/teams", (req, res) => {
  Teams.findByIdAndUpdate(
    req.body.id,
    {
      teams: req.body.teams,
    },
    (err, data) => {
      sendResponse(res, err, null);
    }
  );
});

// GET TEAM
app.get("/teams", async (req, res) => {
  await Teams.find({}, (err, data) => {
    sendResponse(res, err, data);
  });
});

// CREATE PLAYER
app.post("/players", (req, res) => {
  Players.findByIdAndUpdate(
    req.body.id,
    {
      players: req.body.players,
    },
    (err, data) => {
      sendResponse(res, err, null);
    }
  );  
});

// GET PLAYERS
app.get("/players", async (req, res) => {
  await Players.find({}, (err, data) => {
    sendResponse(res, err, data);
  });
});