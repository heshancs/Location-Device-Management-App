import React from "react";
import Location from "../components/Location";
import SideBar from "../components/Sidebar";
import { Box, Grid } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Box bgcolor={"background.default"} color={"text.primary"} padding={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <SideBar />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Location />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
