import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";
import ReactDOM from "react-dom/client";
import Router from "router";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import SofiaPro from "./assets/fonts/Sofia-Pro-Regular.otf";
import SofiaProBold from "./assets/fonts/Sofia-Pro-Bold.otf";

const sofiaPro = {
  fontFamily: "SofiaPro",
  fontStyle: "normal",
  src: `
    local('SofiaPro'),
    local('SofiaPro-Regular'),
    url(${SofiaPro}) format('otf')
  `,
};

const sofiaProBold = {
  fontFamily: "SofiaProBold",
  fontStyle: "normal",
  src: `
    local('SofiaPro-Bold'),
    url(${SofiaProBold}) format('otf')
  `,
};

const theme = createTheme({
  typography: {
    fontFamily: "SofiaPro, SofiaProBold, Segoe UI",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [sofiaPro, sofiaProBold],
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
