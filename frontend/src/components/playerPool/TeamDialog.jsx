import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import TeamDropDown from "components/dropdown";
import useStyles from "commons/styles";

export default function TeamDialog({
  dialogOpen,
  player,
  teams,
  handleClose,
  handleUpdate,
  handleDrop,
}) {
  const classes = useStyles();
  const [selectedTeam, setSelecteedTeam] = useState(0);
  const [selectedPoints, setSelectedPoints] = useState(0);
  const [hasError, setHasError] = useState(false);
  const validate = () => {
    if (selectedPoints === 0 || selectedTeam === 0) {
      setHasError(true);
      return true;
    }
    return false;
  };

  useEffect(() => {
    setSelectedPoints(0);
    setSelecteedTeam(0);
  }, [dialogOpen]);

  const onUpdate = () => {
    if (validate()) return;
    else {
      handleUpdate(player.id, selectedTeam, selectedPoints);
    }
  };
  const onDrop = () => {
    handleDrop(player);
  };
  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: "10px",
          padding: "3vmin",
          background: "#FAFAD2",
        },
      }}
      open={dialogOpen}
      onClose={() => handleClose()}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h5" align="center">
          {player.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {player.teamId === 0 && (
            <Grid container className={classes.conPanel}>
              <Grid item xs={12}>
                <TeamDropDown
                  formValue={selectedTeam}
                  label="Team"
                  data={teams}
                  idKey="id"
                  valueKey="name"
                  onChangeHandler={(e) => {
                    setSelecteedTeam(parseInt(e.target.value, 10));
                  }}
                  hasError={selectedTeam === 0 && hasError}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  className={[classes.formControl, classes.inputInput].join(
                    " "
                  )}
                >
                  <TextField
                    type="number"
                    label="Points"
                    name="Points"
                    value={selectedPoints}
                    onChange={(e) => {
                      setSelectedPoints(parseInt(e.target.value, 10));
                    }}
                    error={selectedPoints === 0 && hasError}
                  />
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {player.teamId === 0 && (
          <Button onClick={() => onUpdate()} className={classes.smallButton}>
            Save
          </Button>
        )}
        {player.teamId !== 0 && (
          <Button onClick={() => onDrop()} className={classes.smallButton}>
            Drop
          </Button>
        )}
        <Button onClick={() => handleClose()} className={classes.smallButton}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TeamDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  player: PropTypes.instanceOf(Object).isRequired,
  teams: PropTypes.instanceOf(Array).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
};
