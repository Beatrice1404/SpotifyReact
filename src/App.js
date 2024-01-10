import React from "react";
import Routes from "./Routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    custom: {
      white: '#FFFFFF',
      black: '#000000',
      grey:"#333",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
