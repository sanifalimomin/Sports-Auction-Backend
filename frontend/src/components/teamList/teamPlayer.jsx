import React from "react";
import { Grid, Typography, Button, CssBaseline,Box } from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "commons/styles";

export default function TeamPlayer({ teamId, teamName, teamPlayers }) {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div
        className={classes.teamPanel1}
      >
        <Typography variant="h6" align="center">
          <b>{teamName}</b>
        </Typography>
        <Grid container>
          {teamPlayers.map((player, index) => (
            <Grid key={index} item xs={12}>
              <Box textAlign='center'>
              <div
                className={[classes.picked, classes.centerAlign].join(' ')}
                style={{ margin: "5px auto", display: "flex" }}
              >
                {player.points === 0
                  ? player.name
                  : player.name + " (" + player.points + ")"}
              </div>
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

TeamPlayer.propTypes = {
  teamId: PropTypes.number.isRequired,
  teamName: PropTypes.string.isRequired,
  teamPlayers: PropTypes.arrayOf(Object).isRequired,
  singleSquad:PropTypes.bool,
};
TeamPlayer.defaultProps ={
  singleSquad: false,
}