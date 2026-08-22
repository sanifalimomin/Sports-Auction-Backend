import React from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "commons/styles";

export default function TeamPurse({ teamName, playersRemaining, pointsRemaining, goldPoints, diamondPoints, platinumPoints }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.conPanel2}>
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          <b>{teamName}</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">{"Players Remaining: " + playersRemaining}</Typography>
      </Grid>
      {goldPoints!=-1 &&(
      <Grid item xs={12}>
        <Typography variant="subtitle1">{"Max Gold Points: " + goldPoints}</Typography>
      </Grid>
      )}
      {diamondPoints!=-1 &&(
      <Grid item xs={12}>
        <Typography variant="subtitle1">{"Min Diamond Points: " + diamondPoints}</Typography>
      </Grid>
      )}
       {platinumPoints!=-1 &&(
      <Grid item xs={12}>
        <Typography variant="subtitle1">{"Min Platinum Points: " + platinumPoints}</Typography>
      </Grid>
       )}
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          {"Points Remaining: " + pointsRemaining}
        </Typography>
      </Grid>
    </Grid>
  );
}

TeamPurse.propTypes = {
  teamName: PropTypes.string.isRequired,
  playersRemaining: PropTypes.number.isRequired,
  pointsRemaining: PropTypes.number.isRequired,
};
