import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Grid, Typography, Paper, Box, CssBaseline } from "@material-ui/core";
import TeamPlayer from "./teamPlayer";
import useStyles from "commons/styles";
import sponsorLogo from "assets/images/sponser.png";
import ysbLogo from "assets/images/aagpl.png";
import { API } from 'api';

export default function TeamList() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const classes = useStyles();
  const title = "TEAM SQUADS";
  const { pageId } = useParams();

  useEffect(() => {
    const interval = setInterval(() => {
      getlocalTeams();
      getLocalPlayers();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
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
      <Paper variant="outlined" className={classes.teamPaper}>
        <Box className={classes.listData}>
          <Grid container spacing={1} className={classes.minheight}>
            {teams.map((team, index) =>
              (parseInt(pageId) === 1 && index < 8) ?
                (<Grid key={index} item xs>
                  <TeamPlayer
                    teamId={team.id}
                    teamName={team.name}
                    teamPlayers={getTeamSquad(team.id)}
                  ></TeamPlayer>
                </Grid>)
                : ((parseInt(pageId) === 2 && index > 8)) ?
                  (<Grid key={index} item xs>
                    <TeamPlayer
                      teamId={team.id}
                      teamName={team.name}
                      teamPlayers={getTeamSquad(team.id)}
                    ></TeamPlayer>
                  </Grid>) : null
            )}
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
