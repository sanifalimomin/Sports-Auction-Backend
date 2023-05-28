const express = require("express");
const bodyParser = require("body-parser");
const port = 8080;
const app = express();
const fs = require('fs');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());


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

// UPDATE TEAM
app.post("/teams", (req, res) => {
  const content = req.body.data;
  console.log(content)
  fs.writeFile('teams.txt', JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).json({ error: 'Failed to store data' });
      return;
    }
    res.json({ message: 'Data stored successfully' });
  });
});

// GET TEAM
app.get("/teams", (req, res) => {
  fs.readFile('teams.txt', 'utf8', (err, teams) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Failed to retrieve data' });
      return;
    }
    const data=JSON.parse(teams);
    console.log(data);
    res.json({ data });
  });
});

// CREATE PLAYER
app.post("/players", (req, res) => {
  const content = req.body.data;
  console.log(content)
  fs.writeFile('players.txt', JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).json({ error: 'Failed to store data' });
      return;
    }
    res.json({ message: 'Data stored successfully' });
  });
});


// GET PLAYERS
app.get("/players", (req, res) => {
  fs.readFile('players.txt', 'utf8', (err, players) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Failed to retrieve data' });
      return;
    }
    const data=JSON.parse(players);
    console.log(data);
    res.json({ data });
  });
});