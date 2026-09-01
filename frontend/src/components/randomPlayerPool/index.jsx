import React, { useState, useEffect } from "react";
import { Grid, Paper, Button, Tooltip, Typography } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import useStyles from "commons/styles";
import { useRandomPlayerStyles } from "./styles";
import { API } from 'api';

import Header from './Header';
import ShuffleAnimation from './ShuffleAnimation';
import PlayerCard from './PlayerCard';
import EmptyState from './EmptyState';

export default function RandomPlayerPool() {
  // State management
  const [players, setPlayers] = useState([]);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shuffling, setShuffling] = useState(false);
  const [currentlySelected, setCurrentlySelected] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(1);
  const [onBreak, setOnBreak] = useState(false); 
  
  // Constants and styles
  const classes = useStyles();
  const customClasses = useRandomPlayerStyles();
  const title = "PLAYER AUCTION";
  const BREAK_AFTER_PLAYERS = 40;

  // Fetch players on component mount
  useEffect(() => {
    fetchPlayers();
  }, []);  
  
  // API Functions
  const fetchPlayers = () => {
    setLoading(true);
    API.get(`/random-players`)
      .then((res) => {
        // Process and categorize players
        const allPlayers = ensurePlayerCategories(res.data.data);
        
        // Filter players by category
        const goldPlayers = allPlayers.filter(player => player.category === 'Gold');
        const nonGoldPlayers = allPlayers.filter(player => player.category !== 'Gold');
                
        setOtherPlayers(nonGoldPlayers);
        setPlayers(goldPlayers);
        
        // Set up initial player display
        setupInitialPlayer(goldPlayers);
      })
      .catch((e) => {
        console.log("Error fetching players:", e);
        setLoading(false);
      });
  };

  const savePlayers = (updatedGoldPlayers) => {
    // Get fresh data to ensure we have the latest version of all players
    API.get(`/random-players`)
      .then((res) => {
        const allPlayersFromAPI = ensurePlayerCategories(res.data.data);
        
        // Update other players state with the latest data
        const otherPlayersFromAPI = allPlayersFromAPI.filter(player => player.category !== 'Gold');
        setOtherPlayers(otherPlayersFromAPI);
        
        // Merge updated gold players with other players
        const updatedPlayerIds = updatedGoldPlayers.map(player => player.id);
        const untouchedPlayers = allPlayersFromAPI.filter(
          player => !updatedPlayerIds.includes(player.id)
        );
        
        const finalAllPlayers = [...updatedGoldPlayers, ...untouchedPlayers];
        
        // Save back to API
        return API.post(`/random-players`, { data: finalAllPlayers });
      })
      .catch((e) => {
        console.log("Error saving players:", e);
      });
  };  

  // Helper Functions
  const ensurePlayerCategories = (players) => {
    return players.map(player => ({
      ...player,
      category: player.category || (player.id % 3 === 0 ? 'Silver' : 'Gold')
    }));
  };
  
  const setupInitialPlayer = (playerList) => {
    // Find any player marked as current
    const currentPlayer = playerList.find(player => player.allocated === 3);
    
    // Update player position counter
    const allocatedCount = playerList.filter(p => p.allocated === 1 && p.teamId).length;
    const nextPosition = allocatedCount + 1;
    setPlayerPosition(nextPosition);
    
    if (currentPlayer) {
      // Display existing current player
      setRandomPlayer(currentPlayer);
      setLoading(false);
    } else {
      // Select a new random player
      selectRandomPlayer(playerList);
    }
    setLoading(false);
  };

  const calculatePlayerPosition = (playersList = players) => {
    const allocatedCount = playersList.filter(p => (p.allocated === 1 || p.allocated === 2)).length;
    const nextPosition = allocatedCount + 1;
    setPlayerPosition(nextPosition);
  };

  // Core Player Selection Logic
  const selectRandomPlayer = (playersList = players) => {
    setCurrentlySelected(false);
    setRandomPlayer(null);
    setShuffling(true);
    
    // Check for existing current player
    const currentPlayers = playersList.filter(player => player.allocated === 3);
    
    if (currentPlayers.length > 0) {
      // Show existing current player
      setTimeout(() => {
        setRandomPlayer(currentPlayers[0]);
        calculatePlayerPosition();
        setShuffling(false);
      }, 1000);
      return;
    }
    
    // Find unprocessed players
    let candidatePlayers = playersList.filter(player => player.allocated === 0);
    
    // If no unprocessed players, show skipped players
    if (candidatePlayers.length === 0) {
      candidatePlayers = playersList.filter(player => player.allocated === 2);
    }
    
    if (candidatePlayers.length > 0) {
      // Show shuffling animation then select random player
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * candidatePlayers.length);
        const selectedPlayer = candidatePlayers[randomIndex];
        
        // Reset any existing current players
        const updatedPlayers = resetCurrentPlayers(playersList);
        
        // Mark new selected player
        const finalPlayers = markPlayerAsCurrent(updatedPlayers, selectedPlayer.id);
        
        // Update state
        setPlayers(finalPlayers);
        savePlayers(finalPlayers);
        setRandomPlayer({...selectedPlayer, allocated: 3});
        calculatePlayerPosition(finalPlayers);
        setShuffling(false);
      }, 2000);
    } else {
      // No players left
      setTimeout(() => setShuffling(false), 1000);
    }
  };
  
  const resetCurrentPlayers = (playersList) => {
    return playersList.map(player => {
      if (player.allocated === 3) {
        return {
          ...player,
          allocated: player.teamId === 0 ? 2 : 0
        };
      }
      return player;
    });
  };
  
  const markPlayerAsCurrent = (playersList, playerId) => {
    return playersList.map(player => {
      if (player.id === playerId) {
        return {
          ...player,
          allocated: 3
        };
      }
      return player;
    });
  };

  // Action Handlers
  const handleRandomSelection = () => {
    // If on break, simply resume
    if (onBreak) {
      setOnBreak(false);
      selectRandomPlayer();
      return;
    }
    
    if (randomPlayer) {
      // Mark current player as skipped
      const updatedPlayers = players.map(player => {
        if (player.id === randomPlayer.id) {
          return {
            ...player,
            allocated: 2,
            teamId: 0
          };
        }
        return player;
      });
      
      // Update state and advance
      calculatePlayerPosition();
      setPlayers(updatedPlayers);
      savePlayers(updatedPlayers);
      
      setTimeout(() => selectRandomPlayer(updatedPlayers), 500);
    } else {
      selectRandomPlayer();
    }
  };

  const handleResumeAfterBreak = () => {
    setOnBreak(false);
    selectRandomPlayer();
  };
  
  const markPlayerAsSelected = () => {
    if (!randomPlayer) return;
    
    setCurrentlySelected(true);
    
    // Update player's status as selected
    const updatedPlayers = players.map(player => {
      if (player.id === randomPlayer.id) {
        return {
          ...player,
          allocated: 1,
          teamId: 0,
          points: 0
        };
      }
      return player;
    });
    
    // Update state and save to backend
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
    
    // Check if break is needed
    const allocatedCount = updatedPlayers.filter(player => 
      player.allocated === 1 || player.allocated === 2
    ).length;
    
    if (allocatedCount > 0 && allocatedCount % BREAK_AFTER_PLAYERS === 0) {
      setOnBreak(true);
    } else {
      setTimeout(() => selectRandomPlayer(updatedPlayers), 1200);
    }
  };
  
  const resetAllPlayers = () => {
    if (!window.confirm("Reset all players' selection status?")) return;
    
    setShuffling(true);
    setOnBreak(false);
    
    // Reset all players
    const resetGoldPlayers = players.map(player => ({
      ...player,
      allocated: 0,
      teamId: 0,
      points: 0
    }));
    
    const resetOtherPlayers = otherPlayers.map(player => ({
      ...player, 
      allocated: 0,
      teamId: 0,
      points: 0
    }));
    
    setPlayers(resetGoldPlayers);
    setOtherPlayers(resetOtherPlayers);
    savePlayers(resetGoldPlayers);
    setPlayerPosition(1);
    
    setTimeout(() => selectRandomPlayer(resetGoldPlayers), 800);
  };

  // Rendering Logic
  const renderContent = () => {
    if (shuffling) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ShuffleAnimation />
        </motion.div>
      );
    }
    
    if (randomPlayer && !onBreak) {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={randomPlayer.id || 'player-card'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 150,
              damping: 15
            }}
            className={customClasses.playerCardContainer}
          >
            <PlayerCard 
              player={randomPlayer}
              currentlySelected={currentlySelected}
              onSelect={markPlayerAsSelected}
              onSkip={handleRandomSelection}
              playerPosition={playerPosition}
            />
          </motion.div>
        </AnimatePresence>
      );
    }
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <EmptyState />
      </motion.div>
    );
  };
  
  const isShowingSkippedPlayers = () => {
    if (randomPlayer && randomPlayer.allocated === 2) return true;
    
    const unallocatedCount = players.filter(player => player.allocated === 0).length;
    const skippedCount = players.filter(player => player.allocated === 2).length;
    return unallocatedCount === 0 && skippedCount > 0;
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header 
          title={title} 
          onBreak={onBreak} 
          playerPosition={playerPosition} 
          showingSkippedPlayers={isShowingSkippedPlayers()} 
        />
      </Grid>
      
      <Grid item xs={12}>
        <Paper 
          variant="outlined" 
          className={`${classes.paper} ${customClasses.mainPaper} ${onBreak ? customClasses.breakPaper : ''}`}
        >
          <AnimatePresence mode="wait">
            {renderContent()}
            {onBreak && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className={customClasses.breakOverlay}
              >
                <Typography variant="h4" className={customClasses.breakText}>
                  <span className={customClasses.blinkingBreak}>●</span> BREAK TIME <span className={customClasses.blinkingBreak}>●</span>
                </Typography>
                <Typography variant="body1" className={customClasses.breakSubtext}>
                  Press "Resume Auction" to continue after the break
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </Grid>
      
      {/* Action buttons */}
      <Grid item xs={12}>
        <div className={customClasses.outsideActionButtonsContainer}>
          <Tooltip 
            title="Reset All Players" 
            placement="top"
            arrow
          >
            <span>
              <Button 
                variant="contained" 
                className={`${customClasses.actionButton} ${customClasses.resetButton}`}
                onClick={resetAllPlayers}
                disabled={shuffling}
                startIcon={<span>↺</span>}
              >
                Reset All Players
              </Button>
            </span>
          </Tooltip>
          
          {onBreak ? (
            <Tooltip title="Resume Auction After Break" placement="top" arrow>
              <span>
                <Button 
                  variant="contained" 
                  className={`${customClasses.actionButton} ${customClasses.resumeButton}`}
                  onClick={handleResumeAfterBreak}
                  disabled={shuffling}
                  endIcon={<span>▶</span>}
                >
                  Resume Auction
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Tooltip title="Draw Random Player" placement="top" arrow>
              <span>
                <Button 
                  variant="contained" 
                  className={`${customClasses.actionButton} ${customClasses.randomizeButton}`}
                  onClick={handleRandomSelection}
                  disabled={shuffling}
                  endIcon={<span>▶</span>}
                >
                  Draw Random Player
                </Button>
              </span>
            </Tooltip>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
