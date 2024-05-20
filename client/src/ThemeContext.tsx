import React, { createContext, useContext, useState } from "react";
import { PaletteMode, ThemeProvider as MuiThemeProvider } from "@mui/material";
import theme from "./theme"; // Import the theme object

interface ThemeContextProps {
  mode: PaletteMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<PaletteMode>("light");
  
    const toggleMode = () => {
      setMode(mode === "light" ? "dark" : "light");
    };
  
    return (
      <MuiThemeProvider theme={mode === "light" ? theme.light : theme.dark}>
        <ThemeContext.Provider value={{ mode, toggleMode }}>
          {children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    );
  };
  
