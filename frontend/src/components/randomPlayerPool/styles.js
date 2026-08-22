import { makeStyles } from "@material-ui/core/styles";

export const useRandomPlayerStyles = makeStyles((theme) => ({
  randomButton: {
    backgroundColor: '#f50057',
    color: 'white',
    fontWeight: 'bold',
    padding: '15px 30px',
    fontSize: '1.2rem',
    borderRadius: '30px',
    boxShadow: '0 4px 20px rgba(245, 0, 87, 0.4)',
    '&:hover': {
      backgroundColor: '#c51162',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 25px rgba(245, 0, 87, 0.5)',
    },
    transition: 'all 0.3s ease',
  },
  playerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '1300px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },  playerCardContainer: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    animation: '$cardEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  },
  breakPaper: {
    position: 'relative',
    backgroundColor: 'rgba(255, 235, 205, 0.8)', // Light beige background for break state
    border: '2px solid #ff9800', // Orange border during break
  },
  breakOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 152, 0, 0.15)', // Slight orange overlay
    zIndex: 10,
  },  breakText: {
    color: '#e65100',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
  },
  blinkingBreak: {
    animation: '$blink 1s infinite',
    color: '#e65100',
    fontSize: '1rem',
  },
  '@keyframes blink': {
    '0%': { opacity: 0.3 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0.3 },
  },breakSubtext: {
    color: '#e65100',
    opacity: 0.8,
  },
  breakIndicator: {
    display: 'inline-block',
    color: '#ff5722',
    fontSize: '0.7em',
    backgroundColor: 'rgba(255, 152, 0, 0.2)',
    padding: '3px 8px',
    borderRadius: '4px',
    marginLeft: theme.spacing(2),
    fontWeight: 'normal',
    verticalAlign: 'middle',
    animation: '$pulse 1.5s infinite',
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 0.6,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0.6,
    }
  },  resumeButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
    animation: '$pulse 1.5s infinite',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
    '&:hover': {
      backgroundColor: '#388e3c',
      boxShadow: '0 6px 20px rgba(76, 175, 80, 0.6)',
    },
  },
  '@keyframes cardEntrance': {
    '0%': {
      opacity: 0,
      transform: 'scale(0.95) translateY(20px)',
    },
    '60%': {
      opacity: 1,
      transform: 'scale(1.02) translateY(-5px)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1) translateY(0)',
    },
  },
  playerCard: {
    background: 'transparent',
    borderRadius: '20px',
    padding: 0,
    boxShadow: 'none',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    transition: 'transform 0.5s ease-out',
    height: '100%', // Ensure full height
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'none',
      pointerEvents: 'none',
      zIndex: 1,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.2)',
    },
    '50%': {
      transform: 'scale(1.03)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 15px 30px rgba(0,0,0,0.25)',
    },
    '100%': {
      transform: 'scale(1)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.2)',
    },
  },
  leftColumn: {
    flex: '0 0 450px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'stretch', // Add this to ensure the Avatar fills the container
    minHeight: 450, // Set explicit minimum height
    [theme.breakpoints.down('md')]: {
      flex: '0 0 380px',
      minHeight: 380,
    },
    [theme.breakpoints.down('sm')]: {
      flex: '1 0 350px',
      width: '100%',
      minHeight: 350,
    },
    '&::after': {
      content: 'none',
    },
  },
  playerAvatar: {
    width: '100%',
    height: '100%',
    minHeight: 450,
    objectFit: 'cover',
    objectPosition: 'center top',
    borderRadius: '20px 0 0 20px',
    borderRight: '5px solid rgba(255, 215, 0, 0.7)',
    boxShadow: '5px 0 20px rgba(0,0,0,0.3)',
    transition: 'filter 0.5s ease-out, transform 0.5s ease-out',
    alignSelf: 'stretch',
    [theme.breakpoints.down('md')]: {
      minHeight: 380,
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 350,
      borderRadius: '20px 20px 0 0',
      borderRight: 'none',
      borderBottom: '5px solid rgba(255, 215, 0, 0.7)',
    },
  },
  rightColumn: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4, 5),
    position: 'relative',
    zIndex: 2,
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '0 20px 20px 0',
    backdropFilter: 'blur(5px)',
    justifyContent: 'space-between', // Add this to push content to top and buttons to bottom
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      borderRadius: '0 0 20px 20px',
    },
    '&::before': {
      content: 'none',
    },
  },  playerName: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '3rem',
    color: 'white',
    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
    marginBottom: theme.spacing(0.5),
    letterSpacing: '1px',
    position: 'relative',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -5,
      left: 0,
      width: '60%',
      height: 4,
      background: 'linear-gradient(to right, #f50057, transparent)',
      transformOrigin: 'left',
    },
  },  playerNumberBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f50057',
    color: 'white',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    fontSize: '1.5rem',
    marginRight: theme.spacing(1.5),
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    fontWeight: 'bold',
    position: 'relative',
    top: '-5px',
  },  skippedChip: {
    backgroundColor: '#ff5722',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    marginTop: theme.spacing(1),
    marginRight: 'auto',
    boxShadow: '0 2px 8px rgba(255, 87, 34, 0.5)',
    padding: theme.spacing(0.5, 1.5),
    border: '2px solid #ffeb3b',
    '&:hover': {
      backgroundColor: '#e64a19',
    },
    // Add a pulsing animation to draw attention
    animation: '$skippedPulse 2s infinite',
  },
  '@keyframes skippedPulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(255, 87, 34, 0.7)',
    },
    '70%': {
      boxShadow: '0 0 0 10px rgba(255, 87, 34, 0)',
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(255, 87, 34, 0)',
    }
  },
  playerRole: {
    textAlign: 'left',
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: 500,
    letterSpacing: '1px',
  },
  basePrice: {
    textAlign: 'left',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: theme.spacing(3, 0, 4),
    color: '#ffeb3b',
    padding: '10px 20px',
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  playerStats: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    margin: theme.spacing(3, 0, 3),
    width: '100%',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(1, 2, 1, 0),
    padding: theme.spacing(2),
    minWidth: 120,
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.05)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      background: 'rgba(255, 255, 255, 0.15)',
    },
  },
  statValue: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: theme.spacing(1),
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 500,
  },
  divider: {
    margin: theme.spacing(3, 0),
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: '1px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 'auto', // Push to bottom of flex container
    paddingTop: theme.spacing(2), // Add some space above buttons
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      padding: theme.spacing(2, 0, 0),
    },
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: theme.spacing(1.5),
    },
  },
  selectButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    '&:hover': {
      backgroundColor: '#219653',
      transform: 'translateY(-2px)', // Reduced hover effect
      boxShadow: '0 6px 15px rgba(39, 174, 96, 0.4)',
    },
    padding: '6px 12px', // Even smaller padding
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    borderRadius: '50px',
    boxShadow: '0 4px 10px rgba(39, 174, 96, 0.3)', // Reduced shadow
    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    fontSize: '0.8rem', // Smaller font
    flex: '0 1 auto',
    minWidth: '120px', // Smaller width
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  skipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-2px)', // Reduced hover effect
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
    },
    padding: '6px 12px', // Even smaller padding
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    borderRadius: '50px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)', // Reduced shadow
    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    backdropFilter: 'blur(10px)',
    fontSize: '0.8rem', // Smaller font
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: '2px',
    flex: '0 1 auto',
    minWidth: '120px', // Smaller width
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  loadingAnimation: {
    position: 'relative',
    width: '100%',
    height: '450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDeck: {
    position: 'relative',
    width: '280px',
    height: '380px',
    perspective: '1500px',
  },
  loadingCard: {
    position: 'absolute',
    width: '280px',
    height: '380px',
    borderRadius: '15px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
    top: 0,
    left: 0,
  },
  card1: {
    background: 'linear-gradient(45deg, #2c3e50, #4a6572)',
    transform: 'translateZ(-20px) translateX(-20px) rotateY(-5deg)',
    zIndex: 1,
  },
  card2: {
    background: 'linear-gradient(45deg, #2c3e50, #3498db)',
    transform: 'translateZ(-10px) translateX(-10px) rotateY(-3deg)',
    zIndex: 2,
  },
  card3: {
    background: 'linear-gradient(45deg, #2c3e50, #27ae60)',
    transform: 'translateZ(0) translateX(0) rotateY(0)',
    zIndex: 3,
    animation: '$float 3s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateZ(0) translateY(0) rotateY(0)'
    },
    '50%': {
      transform: 'translateZ(15px) translateY(-15px) rotateY(5deg)'
    }
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '15px',
    background: 'linear-gradient(45deg, #f50057, #ff4081)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '40px',
    backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
  },
  loadingText: {
    marginTop: 16, 
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    letterSpacing: '1px',
  },
  noPlayerMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(6),
    color: 'white',
    height: '50vh',
  },
  emptyStateText: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#bdc3c7',
    marginBottom: theme.spacing(2),
    animation: '$bounce 2s ease-in-out infinite alternate',
  },
  '@keyframes bounce': {
    '0%': {
      transform: 'translateY(0)'
    },
    '100%': {
      transform: 'translateY(-10px)'
    }
  },
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5),
    minHeight: '60vh',
  },
  mainPaper: {
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    background: 'transparent',
    boxShadow: 'none',
    overflow: 'hidden',
    position: 'relative',
  },
  playerChip: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: '50px',
    fontWeight: 'bold',
    backgroundColor: 'rgba(52, 152, 219, 0.7)',
    color: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  statsSection: {
    marginTop: theme.spacing(3),
    width: '100%',
    position: 'relative',
    '& h6': {
      color: 'white',
      fontWeight: 'bold',
    },
  },  headerTitle: {
    color: 'white',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
    letterSpacing: '1px',
  },  playerCounter: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '0.9rem',
    marginBottom: theme.spacing(1.5),
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    fontWeight: 'normal',
  },  breakApproaching: {
    display: 'inline-block',
    marginLeft: theme.spacing(2),
    fontSize: '0.85rem',
    color: 'rgba(255, 152, 0, 0.9)',
    padding: '2px 8px',
    borderRadius: '4px',
    background: 'rgba(0, 0, 0, 0.2)',
  },  skippedPlayersIndicator: {
    display: 'inline-block',
    marginLeft: theme.spacing(2),
    fontSize: '0.9rem',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '4px',
    background: 'rgba(255, 87, 34, 0.85)',
    fontWeight: 'bold',
    border: '1px solid #ffeb3b',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    animation: '$skippedIndicatorPulse 2s infinite',
  },  '@keyframes skippedIndicatorPulse': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.7,
    },
    '100%': {
      opacity: 1,
    }
  },
  skippedTitleHighlight: {
    color: '#ff5722',
    backgroundColor: 'rgba(255, 235, 59, 0.2)',
    padding: '0 8px',
    borderRadius: '4px',
    border: '1px solid #ff5722',
    marginRight: theme.spacing(1),
    fontWeight: 'bold',
    display: 'inline-block',
  },
  actionButtonsContainer: {
    display: 'flex',
    justifyContent: 'center', 
    width: '100%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
  },
  actionButton: {
    padding: '12px 30px',
    borderRadius: '30px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    fontSize: '1.1rem',
    minWidth: '200px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
    },
    '&:disabled': {
      opacity: 0.5,
    },
  },
  randomizeButton: {
    backgroundColor: '#f50057',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ff1976',
    },
    '&:active': {
      backgroundColor: '#c51162',
      transform: 'scale(0.98) translateY(2px)',
    },
  },
  resetButton: {
    backgroundColor: '#7f8c8d',
    color: 'white',
    '&:hover': {
      backgroundColor: '#95a5a6',
    },
    '&:active': {
      backgroundColor: '#6b7a7c',
      transform: 'scale(0.98) translateY(2px)',
    },
  },
  dialogTitle: {
    background: 'linear-gradient(to right, #2c3e50, #4a6572)',
    color: 'white',
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1, 0, 2),
    width: '100%',
  },
  dialogActions: {
    padding: theme.spacing(2, 3, 3),
  },
  shuffleContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    width: '100%',
    position: 'relative',
  },
  cardDeckShuffle: {
    position: 'relative',
    width: '300px',
    height: '400px',
    perspective: '1500px',
    transformStyle: 'preserve-3d',
  },
  shuffleCard: {
    position: 'absolute',
    width: '220px',
    height: '320px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    top: '50%',
    left: '50%',
    marginLeft: '-110px',
    marginTop: '-160px',
    background: 'white',
    transformStyle: 'preserve-3d',
    transformOrigin: 'center center',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '12px',
      boxShadow: 'inset 0 0 15px rgba(255,255,255,0.5)',
      pointerEvents: 'none',
    },
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '12px',
    background: 'linear-gradient(145deg, #1e3c72, #2a5298)',
    border: '8px solid white',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
      pointerEvents: 'none',
    },
  },
  shuffleTextContainer: {
    marginTop: theme.spacing(6),
    position: 'relative',
    padding: theme.spacing(2, 4),
    background: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '50px',
    backdropFilter: 'blur(8px)',
  },
  shuffleText: {
    color: 'white',
    fontSize: '1.6rem',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: '1px',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  outsideActionButtonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    gap: theme.spacing(3),
    position: 'relative',
    zIndex: 10,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing(2),
      padding: theme.spacing(0, 2),
    },
  },
}));