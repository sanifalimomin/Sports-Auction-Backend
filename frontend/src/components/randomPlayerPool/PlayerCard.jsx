import React from 'react';
import { Box, Typography, Avatar, Chip, Divider, Button } from "@material-ui/core";
import { motion, AnimatePresence } from "framer-motion";
import { useRandomPlayerStyles } from './styles';

// Slash-separated path segments ending in a known image extension. Segments
// cannot contain dots, so "..", backslashes, absolute paths and absolute URLs
// are all rejected -- only names under assets/images can resolve.
const SAFE_PICTURE_NAME =
  /^(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.(?:png|jpe?g|webp|gif)$/;

// Inlined so a missing player photo does not reach out to a third-party image
// host (which would leak a request per miss and violate the app's CSP).
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="450" height="600" viewBox="0 0 450 600">' +
      '<rect width="450" height="600" fill="#2b2b2b"/>' +
      '<circle cx="225" cy="235" r="86" fill="#4a4a4a"/>' +
      '<path d="M85 600c0-77 63-140 140-140s140 63 140 140z" fill="#4a4a4a"/>' +
    '</svg>'
  );

const PlayerCard = ({ player, currentlySelected, onSelect, onSkip, playerPosition }) => {
  const classes = useRandomPlayerStyles();
  
  if (!player) return null;

  const getImageSrc = () => {
    try {
      // `player.picture` arrives from the API, so it is never interpolated into
      // the require() path unvalidated: restrict it to a bare filename with a
      // known image extension. This keeps the webpack context lookup from being
      // steered outside assets/images by a crafted value.
      if (player.picture && SAFE_PICTURE_NAME.test(player.picture)) {
        return require(`assets/images/${player.picture}`);
      }
      return PLACEHOLDER_IMAGE;
    } catch (error) {
      // Unknown filename -- fall back to the bundled placeholder.
      return PLACEHOLDER_IMAGE;
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0.7, 
      filter: "grayscale(100%) brightness(0.7)" 
    },
    visible: { 
      opacity: 1, 
      filter: "grayscale(0%) brightness(1)",
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const nameVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  const priceVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const statVariants = (delay) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: 0.3 + (delay * 0.1)
      }
    }
  });

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: 0.8
      }
    }
  };

  return (
    <Box className={classes.playerContainer}>
      <AnimatePresence mode="wait">
        <motion.div 
          key={player.id || 'player-card'}
          className={classes.playerCard}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={cardVariants}
        >
          <motion.div className={classes.leftColumn} variants={itemVariants}>
            <Avatar 
              src={getImageSrc()} 
              className={classes.playerAvatar}
              alt={player.fullName}
              variant="square"
              style={{ 
                height: '100%', 
                width: '100%', 
                position: 'absolute',
                top: 0,
                left: 0
              }}
              imgProps={{
                style: {
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  width: '100%',
                  height: '100%'
                }
              }}
            />
          </motion.div>
          
          <div className={classes.rightColumn}>
            {/* Top content section */}
            <div>              <motion.div variants={nameVariants}>
                <Typography className={classes.playerName}>
                  {playerPosition ? (
                    <>
                      <span className={classes.playerNumberBadge}>{playerPosition}</span>
                      {player.fullName}
                    </>
                  ) : player.fullName}
                </Typography>                {player.allocated === 2 && (
                  <Chip 
                    label="PREVIOUSLY SKIPPED PLAYER" 
                    size="medium"
                    className={classes.skippedChip}
                  />
                )}
              </motion.div>
              
              <motion.div variants={nameVariants}>
                <Typography className={classes.playerRole}>
                  {player.role || "Player"}
                </Typography>
              </motion.div>
              
              <div className={classes.playerStats}>
                {/* Stats content */}
                {/* <motion.div className={classes.statItem} variants={statVariants()}>
                  <Typography className={classes.statValue}>
                    best bowler
                  </Typography>
                  <Typography className={classes.statLabel}>
                    AAGPL 14
                  </Typography>
                </motion.div> */}
                {/* Add more stats as needed */}
              </div>
            </div>
            
            {/* Divider */}
            <Divider className={classes.divider} />
            
            {/* Button section - always at bottom */}
            <motion.div 
              className={classes.buttonContainer} 
              variants={buttonVariants}
            >
              <div className={classes.buttonRow}>
                <Button 
                  variant="contained" 
                  className={classes.selectButton}
                  onClick={onSelect}
                  disabled={currentlySelected}
                  startIcon={<span>✓</span>}
                >
                  {currentlySelected ? "Selected" : "Select"}
                </Button>
                <Button 
                  variant="outlined"
                  className={classes.skipButton}
                  onClick={onSkip}
                  endIcon={<span>▶</span>}
                >
                  Skip
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default PlayerCard;