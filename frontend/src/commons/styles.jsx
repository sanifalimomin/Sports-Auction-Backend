import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  notselected: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "80%",
    // float: "center",
    color: "#000000",
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderRadius: ".4rem",
    textTransform: "uppercase",
    fontWeight: "bolder",
    borderWidth: "2px",
    borderStyle: "solid",
    '&:hover': {
      color: '#ffffff',
      borderColor: '#fafafa',
      boxShadow: 'none',
    },
  },
  picked: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "80%",
    // float: "center",
    color: "#000000",
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderRadius: ".4rem",
    textTransform: "uppercase",
    fontWeight: "bolder",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  centerAlign: {
    justifyContent: 'center'
  },
  selected: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "80%",
    // float: "center",
    color: "#fafafa",
    backgroundColor: "#a0aba6",
    borderColor: "#ffffff",
    borderRadius: ".4rem",
    textTransform: "uppercase",
    fontWeight: "bolder",
    borderWidth: "2px",
    borderStyle: "solid",
    // "&:000000": {
    //   color: "#fafafa",
    //   backgroundColor: "#000000",
    //   borderColor: "#fafafa",
    //   boxShadow: "none",
    // },
  },
  drop: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "80%",
    float: "right",
    color: "#000000",
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderRadius: ".4rem",
    textTransform: "uppercase",
    fontWeight: "bolder",
    borderWidth: "2px",
    borderStyle: "solid",
    '&:hover': {
      color: '#fafafa',
      // backgroundColor: '#000000',
      borderColor: '#fafafa',
      boxShadow: 'none',
    },
  },
  paper: {
    margin: theme.spacing(2),
    borderRadius: "50px",
    padding: theme.spacing(2),
    borderColor: "#ffffff",
    // background: "linear-gradient(135deg, #009d72 20%, #00181a 100%)",
    background: "transparent",
    borderWidth: "4px",
    borderStyle: "solid",
  },
  teamPaper: {
    border: "none",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    background: "transparent",
    height: "95vh",
    overflow: "hidden",
    marginTop: "0px",
    paddingTop: "0px",
  },
  grid: {
    padding: theme.spacing(0.5),
  },
  listData: {
    height: "100%",
    overflow: "auto",
  },
  conPanel: {
    borderRadius: "15px",
    padding: theme.spacing(2),
    paddingRight: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
    backgroundColor: "#ffffff",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  teamPanel1: {
    borderRadius: "15px",
    padding: theme.spacing(2),
    paddingRight: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
    borderColor: "#ffffff",
    // background: "#0B4267",
    // background: "linear-gradient(135deg, #000000, #2d121c, #551832, #801b4a, #ad1865, #ad1865, #ad1865, #ad1865, #801b4a, #551832, #2d121c, #000000)",
    borderWidth: "4px",
    borderStyle: "solid",
    color: "#ffffff",
    minHeight: "85%",
  },
  formControl: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "90%",
    alignContent: "center",
  },
  inputInput: {
    padding: theme.spacing(1),
    "&:placeholder": {
      fontWeight: theme.typography.fontWeightLight,
    },
    fontFamily: "sans-serif",
    fontSize: 16,
  },
  smallButton: {
    width: "25%",
    padding: theme.spacing(2),
  },
  conPanel2: {
    borderRadius: "15px",
    borderColor: "#ffffff",
    padding: theme.spacing(1),
    backgroundColor: "#ffffff",
    margin: theme.spacing(1),
    width: "90%",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  timmerBox: {
    margin: "10px",
    display: "flex",
    justifyContent: "center",
  },

  timer: {
    fontFamily: "Montserrat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  timmerText: {
    color: "#ffffff",
    fontSize: "30px",
  },

  timmerValue: {
    color: "#ffffff",
    fontSize: "60px",
  },
  heading1: {
    fontSize: "40px",
    color: "#ffffff",
    padding: theme.spacing(1),
    marginTop: "8vh"
  },
  minheight: {
    minHeight: "95%",
  },
  logo: {
    width: "15vh",
    display: "block",
    margin: "16px auto",
  },
  leftLogo: {
    width: "25vh",
    display: "block",
    marginLeft: "15px",
    marginTop: "10px",
    paddingTop: "20px"
  },
  rightLogo: {
    width: "40vh",
    display: "block",
    marginRight: "0px",
    marginTop: "10px",
    paddingTop: "20px"
  },
  rightAlign: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  header: {
    paddingBottom: "50px"
  }
}));

export default useStyles;
