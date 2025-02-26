import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="relative">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{}}>
          @{new Date().getFullYear()} Product. All rights reserved
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
