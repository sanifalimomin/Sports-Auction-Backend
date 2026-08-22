import React from 'react';
import { Box, Typography } from "@material-ui/core";
import { useRandomPlayerStyles } from './styles';

const EmptyState = () => {
  const classes = useRandomPlayerStyles();

  return (
    <Box className={classes.noPlayerMessage}>
      <Typography className={classes.emptyStateText}>
        🏏
      </Typography>
      
      <Typography variant="h5">
        No unselected players available
      </Typography>
      
      <Typography variant="body1" style={{ marginTop: 16, color: '#95a5a6' }}>
        Try resetting all players to start fresh
      </Typography>
    </Box>
  );
};

export default EmptyState;