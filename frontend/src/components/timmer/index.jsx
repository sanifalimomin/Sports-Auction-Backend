import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import useStyles from "commons/styles";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function RenderTime({ remainingTime }) {
  const classes = useStyles();
  if (remainingTime === 0) {
    return (
      <div className={classes.timer}>
        <div className={classes.timmerText}>Release</div>
        <div className={classes.timmerText}>timmer</div>
        <div className={classes.timmerText}>Ends!!</div>
      </div>
    );
  }

  return (
    <div className={classes.timer}>
      <div className={classes.timmerText}>Remaining</div>
      <div className={classes.timmerValue}>{remainingTime}</div>
      <div className={classes.timmerText}>seconds</div>
    </div>
  );
}

export default function Timmer() {
  const classes = useStyles();
  const [timerPlaying, setTimmerPlaying] = useState(false);
  const [duration, setDuration] = useState(30);
  const [key, setKey] = useState(1);
  const onStart = () => {
    setDuration(60);
    setTimmerPlaying(true);
  };
  const onStop = () => {
    setDuration(0);
    setTimmerPlaying(false);
    setKey(key + 1);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.timmerBox}>
          <CountdownCircleTimer
            key={key}
            isPlaying={timerPlaying}
            duration={duration}
            size={250}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[30, 20, 10, 0]}
            onComplete={() => onStop()}
            updateInterval={0}
          >
            {RenderTime}
          </CountdownCircleTimer>
        </div>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={() => onStart()} className={classes.notselected}>
          Start
        </Button>{" "}
      </Grid>

      <Grid item xs={6}>
        <Button onClick={() => onStop()} className={classes.notselected}>
          Reset
        </Button>
      </Grid>
    </Grid>
  );
}
