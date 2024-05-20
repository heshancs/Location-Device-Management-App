import { ModeNight } from "@mui/icons-material";
import {
  AppBar,
  Box,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Switch,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../ThemeContext";
import { useAuth } from "../AuthContext";

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
})) as typeof Toolbar;

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
})) as typeof Box;

const ModeBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const Navbar: React.FC = () => {
  const { mode, toggleMode } = useThemeContext();
  const { logout, user } = useAuth();

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no token found");
      return false;
    }
    return true;
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            App
          </Typography>
        </Link>

        <ModeBox>
          <ModeNight />
          <Icons>
            <Switch checked={mode === "dark"} onChange={toggleMode} />
          </Icons>
        </ModeBox>
        {isAuthenticated() && (
          <Typography
            variant="body1"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Welcome {user?.username}
          </Typography>
        )}

        {isAuthenticated() && <MenuItem onClick={logout}>Logout</MenuItem>}
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
