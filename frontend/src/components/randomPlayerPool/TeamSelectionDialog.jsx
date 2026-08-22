import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, TextField, Button 
} from "@material-ui/core";
import { useRandomPlayerStyles } from './styles';

const TeamSelectionDialog = ({ 
  open, 
  onClose, 
  player, 
  teams,
  selectedTeam,
  setSelectedTeam,
  playerPoints,
  setPlayerPoints,
  onConfirm
}) => {
  const classes = useRandomPlayerStyles();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle className={classes.dialogTitle}>
        Select Team for {player?.name}
      </DialogTitle>
      <DialogContent>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="team-select-label">Team</InputLabel>
          <Select
            labelId="team-select-label"
            id="team-select"
            value={selectedTeam}
            onChange={e => setSelectedTeam(e.target.value)}
            label="Team"
            required
          >
            <MenuItem value="">
              <em>Select a team</em>
            </MenuItem>
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            label="Points"
            type="number"
            variant="outlined"
            value={playerPoints}
            onChange={e => setPlayerPoints(e.target.value)}
            required
            InputProps={{
              startAdornment: <span style={{ marginRight: 8 }}></span>,
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button 
          onClick={onClose} 
          color="default"
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          color="primary" 
          variant="contained"
          disabled={!selectedTeam || !playerPoints}
        >
          Confirm Selection
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamSelectionDialog;