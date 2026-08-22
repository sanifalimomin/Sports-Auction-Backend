import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import { useRandomPlayerStyles } from './styles';
import useStyles from "commons/styles";
import sponsorLogo from "assets/images/sponser.png";
import ysbLogo from "assets/images/aagpl.png";

const Header = ({ title, onBreak, playerPosition, showingSkippedPlayers }) => {
  const classes = useStyles();
  const customClasses = useRandomPlayerStyles();

  return (
    <Grid container alignItems="center">
      <Grid item xs>
        <img src={sponsorLogo} alt="logo" className={classes.leftLogo} />
      </Grid>      <Grid key={2} item>        <Typography variant="h4" align="center" className={`${classes.heading1} ${customClasses.headerTitle}`}>          <b>
            {onBreak 
              ? `${title} - ON BREAK` 
              : showingSkippedPlayers 
                ? <><span className={customClasses.skippedTitleHighlight}>SKIPPED PLAYERS</span> PHASE</>
                : title}
          </b>
          {playerPosition > 0 && playerPosition % 40 === 0 && !onBreak && !showingSkippedPlayers && (
            <span className={customClasses.breakIndicator}> 
              (Break after this player)
            </span>
          )}
        </Typography>        {playerPosition > 0 && (
          <Typography variant="subtitle1" align="center" className={customClasses.playerCounter}>
            Player: {playerPosition} / {playerPosition % 40 === 0 ? 40 : playerPosition % 40} of current session
            {!onBreak && !showingSkippedPlayers && playerPosition % 40 !== 0 && (
              <span className={customClasses.breakApproaching}>
                {40 - (playerPosition % 40)} players until next break
              </span>
            )}          {showingSkippedPlayers && (
              <span className={customClasses.skippedPlayersIndicator}>
                ⚠️ Auctioning previously skipped players ⚠️
              </span>
            )}
          </Typography>
        )}
      </Grid>
      <Grid item xs>
        <Grid container className={classes.rightAlign}>
          <Grid item>
            <img src={ysbLogo} alt="logo" className={classes.rightLogo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;