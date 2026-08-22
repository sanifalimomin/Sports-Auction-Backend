import React from 'react';
import { Box, Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import { useRandomPlayerStyles } from './styles';
import sponsorBackImage from 'assets/images/aagpl-gold.png';

const ShuffleAnimation = () => {
  const classes = useRandomPlayerStyles();

  // Create an array of cards for the shuffling effect
  const cards = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    x: Math.random() * 40 - 20,
    y: Math.random() * 20 - 10,
    rotate: Math.random() * 10 - 5,
    scale: 0.85 + Math.random() * 0.2
  }));

  return (
    <Box className={classes.shuffleContainer}>
      <div className={classes.cardDeckShuffle}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={classes.shuffleCard}
            initial={{ 
              x: card.x, 
              y: card.y, 
              rotate: card.rotate, 
              scale: card.scale,
              zIndex: index
            }}
            animate={{
              x: [card.x, 0, card.x * -1.5, card.x],
              y: [card.y, -15, card.y * -1.2, card.y],
              rotate: [card.rotate, card.rotate * -2, card.rotate * 1.5, card.rotate],
              scale: [card.scale, card.scale * 1.05, card.scale * 0.95, card.scale],
              zIndex: [index, 10, index, index]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.3, 0.6, 1],
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          >
            <div 
              className={classes.cardImage}
              style={{ 
                backgroundImage: `url(${sponsorBackImage})`,
                backgroundSize: '80%', // Adjust size of the logo
              }}
            />
          </motion.div>
        ))}
      </div>
      
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [0.98, 1, 0.98]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
        className={classes.shuffleTextContainer}
      >
        <Typography className={classes.shuffleText}>
          Shuffling Players...
        </Typography>
      </motion.div>
    </Box>
  );
};

export default ShuffleAnimation;