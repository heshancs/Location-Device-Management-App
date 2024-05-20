import { createTheme } from "@mui/material";

const theme = {
  light: createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1760a5",
        light: "skyblue",
      },
      secondary: {
        main: "#15c630",
      },
      info: {
        main: "#999",
      },
    },
  }),
  dark: createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1760a5",
        light: "skyblue",
      },
      secondary: {
        main: "#15c630",
      },
      info: {
        main: "#999",
      },
    },
  }),
};

export default theme;
