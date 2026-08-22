import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Grid, Typography, Paper, Box, CssBaseline } from "@material-ui/core";
import TeamPlayer from "../teamList/teamPlayer";
import useStyles from "commons/styles";
import TeamPurse from "components/playerPool/TeamPurse";
import sponsorLogo from "assets/images/sponser.png";
import ysbLogo from "assets/images/aagpl.png";
import { API } from 'api';

export default function TeamSquad() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const classes = useStyles();
  const { teamId } = useParams();
  const title2 = "TEAM PURSE";

  useEffect(() => {
    const interval = setInterval(() => {
      getlocalTeams();
      getLocalPlayers();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [teamId]);

  const getlocalTeams = () => {
    API.get(`/teams`)
      .then((res) => {
        const team = res.data.data.find((f) => f.id === parseInt(teamId))
        setTeamName(team.name)
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

  const getTeamSquad = (teamId) => {
    let teamSquad = players.filter(function getteamPlayer(player) {
      return player.teamId === teamId;
    });
    return teamSquad;
  };

  const onRefresh = () => {
    getlocalTeams();
    getLocalPlayers();
  };

  return (
    <>
      <CssBaseline />
      <Grid container className={classes.header} alignItems="center">
        <Grid item xs>
          <img src={sponsorLogo} alt="logo" className={classes.leftLogo} />
        </Grid>
        <Grid key={2} item >
          <Typography
            variant="h4"
            align="center"
            className={classes.heading1}
            onClick={onRefresh}
          >
            <b>{teamName}</b>
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
      <Paper variant="outlined" className={classes.teamPaper}>
        <Box className={classes.listData}>
          <Grid container spacing={1} className={classes.minheight}>
            <Grid item xs={4}>
              <TeamPlayer
                teamId={parseInt(teamId)}
                teamName={teamName}
                teamPlayers={getTeamSquad(parseInt(teamId))}
              ></TeamPlayer>
            </Grid>
            <Grid item xs={8}>
              <Box className={classes.listData}>
                <Grid container>
                  {teams.map((team, index) => (
                    <Grid key={index} item xs={4}>
                      <TeamPurse
                        teamName={team.name}
                        playersRemaining={team.playersRemaining}
                        pointsRemaining={team.pointsRemaining}
                        goldPoints= {-1}
                        diamondPoints={-1}
                        platinumPoints={-1} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
