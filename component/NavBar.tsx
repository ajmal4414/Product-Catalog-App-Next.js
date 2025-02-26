"use client";
import { AppBar, Toolbar, Typography } from "@mui/material";
const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Product</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
