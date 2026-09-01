import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, Button } from "@material-ui/core";
import { TEAMS, PLAYERS } from "commons/data";
import TeamDialog from "./TeamDialog";
import useStyles from "commons/styles";
import TeamPurse from "./TeamPurse";
import sponsorLogo from "assets/images/sponser.png";
import ysbLogo from "assets/images/aagpl.png";
import { API } from 'api';

export default function PlayerPool() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamDialogStatus, setTeamDialogStatus] = useState(false);
  const [player, setPlayer] = useState({});
  const classes = useStyles();
  const title = "PLAYER POOL";
  const title2 = "TEAM PURSE";

  useEffect(() => {
    getlocalTeams();
    getLocalPlayers();
  }, []);

  const getlocalTeams = () => {
    API.get(`/teams`)
      .then((res) => {
        setTeams(res.data.data);
      })
      .catch((e) => {
        console.error("API request failed:", e.message)
      })
  };
  const getLocalPlayers = () => {
    API.get(`/players`)
      .then((res) => {
        setPlayers(res.data.data);
      })
      .catch((e) => {
        console.error("API request failed:", e.message)
      })
  };

  const setLocalTeams = (localTeam) => {
    const payload = {
      data: localTeam
    };
    API.post(`/teams`, payload)
      .then(() => {
        // response body intentionally not logged
      })
      .catch((e) => {
        console.error("API request failed:", e.message)
      })
  };

  const setLocalPlayers = (localPlayer) => {
    const payload = {
      data: localPlayer
    };
    API.post(`/players`, payload)
      .then(() => {
        // response body intentionally not logged
      })
      .catch((e) => {
        console.error("API request failed:", e.message)
      })
  };

  const playerClick = (player) => {
    setTeamDialogStatus(true);
    setPlayer(player);
  };

  const updatePlayer = (playerId, teamId, points) => {
    const updateTeam = teams;
    const playerCategory = players.find((i) => i.id === playerId).category;
    updateTeam.forEach((i) => {
      if (i.id === teamId) {
        if (playerCategory == "Gold") {
          i.maxGold -= points;
        } else if (playerCategory == "Diamond") {
          i.minDiamond =0;
          const remainingPoints = points - 20;
          i.maxGold -= remainingPoints;
        } else if (playerCategory == "Platinum") {
          i.minPlatinum =0;
          const remainingPoints = points - 30;
          i.maxGold -= remainingPoints;
        }
        i.playersRemaining -= 1;
        i.pointsRemaining -= points;
      }
    });
    setLocalTeams(updateTeam);
    const updatePlayer = players;
    updatePlayer.forEach((i) => {
      if (i.id === playerId) {
        i.points = points;
        i.allocated = 1;
        i.teamId = teamId;
      }
    });
    setLocalPlayers(updatePlayer);
    setTeamDialogStatus(false);
  };

  const dropPlayer = (player) => {
    const updateTeam = teams;
    const playerCategory = players.find((i) => i.id === player.id).category;
    updateTeam.forEach((i) => {
      if (i.id === player.teamId) {
        if (playerCategory == "Gold") {
          i.maxGold += player.points;
        } else if (playerCategory == "Diamond") {
          i.minDiamond = 20;
          const remainingPoints = player.points - 20;
          i.maxGold += remainingPoints;
        } else if (playerCategory == "Platinum") {
          i.minPlatinum = 30;
          const remainingPoints = player.points - 30;
          i.maxGold += remainingPoints;
        }
        i.playersRemaining += 1;
        i.pointsRemaining += player.points;
      }
    });
    setLocalTeams(updateTeam);
    const updatePlayer = players;
    updatePlayer.forEach((i) => {
      if (i.id === player.id) {
        i.points = 0;
        i.allocated = 0;
        i.teamId = 0;
      }
    });
    setLocalPlayers(updatePlayer);
    setTeamDialogStatus(false);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container className={classes.header} alignItems="center">
          <Grid item xs>
            <img src={sponsorLogo} alt="logo" className={classes.leftLogo} />
          </Grid>
          <Grid key={2} item >
            <Typography variant="h4" align="center" className={classes.heading1}>
              <b>{title}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Grid container className={classes.rightAlign}>
              <Grid item>
                <img src={ysbLogo} alt="logo" className={classes.rightLogo} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Paper variant="outlined" className={classes.paper}>
          <Box className={classes.listData}>
            <Grid container>
              {players.map((player, index) => (
                <Grid key={index} item xs={2}>
                  <Button
                    onClick={() => playerClick(player)}
                    className={
                      player.allocated === 0
                        ? classes.notselected
                        : player.allocated === 1
                          ? classes.drop
                          : classes.selected
                    }
                  >
                    {player.points === 0
                      ? player.name
                      : player.name + " (" + player.points + ")"}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        {/* <Paper variant="outlined" className={classes.paper}>
          <Typography variant="h4" align="center" className={classes.heading1}>
            <b>{title3}</b>
          </Typography>
          <Box className={classes.listData}>
            <Timmer></Timmer>
          </Box>
        </Paper> */}
        <Paper variant="outlined" className={classes.paper}>
          <Typography variant="h4" align="center" className={classes.heading1}>
            <b>{title2}</b>
          </Typography>
          <Box className={classes.listData}>
            <Grid container>
              {teams.map((team, index) => (
                <Grid key={index} item xs={6}>
                  <TeamPurse
                    teamName={team.name}
                    playersRemaining={team.playersRemaining}
                    pointsRemaining={team.pointsRemaining}
                    goldPoints={team.maxGold}
                    diamondPoints={team.minDiamond}
                    platinumPoints={team.minPlatinum}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <TeamDialog
        dialogOpen={teamDialogStatus}
        player={player}
        teams={teams}
        handleClose={() => {
          setTeamDialogStatus(false);
        }}
        handleUpdate={updatePlayer}
        handleDrop={dropPlayer}
      ></TeamDialog>
    </Grid>
  );
}
