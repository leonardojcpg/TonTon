import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";

export const Header = () => {
  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: "#141414",
        width: "100%",
        marginLeft: 0,
        marginRight: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Typography
            variant="h6"
            href="/"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Roboto", color: "#D6FFD6" }}
          >
            TonTon
          </Typography>
        </IconButton>
        <Typography
          variant="h6"
          href="/"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "Roboto", color: "#D6FFD6" }}
        ></Typography>
        <Button
          color="inherit"
          href="/dashboard"
          sx={{
            color: "#fff",
            "&:hover": { color: "#5D915D", transition: "ease-in .2s" },
          }}
        >
          Home
        </Button>

        <Button
          color="inherit"
          href="/breastfeeding"
          sx={{
            color: "#fff",
            "&:hover": { color: "#5D915D", transition: "ease-in .2s" },
          }}
        >
          Breast-Feeding
        </Button>
        <Button
          color="inherit"
          href="/sleep"
          sx={{
            color: "#fff",
            "&:hover": { color: "#5D915D", transition: "ease-in .2s" },
          }}
        >
          Sleep
        </Button>
        <Button
          variant="inherit"
          href="/diapers"
          sx={{
            color: "#fff",
            "&:hover": { color: "#5D915D", transition: "ease-in .2s" },
          }}
        >
          Diapers
        </Button>
        <Button
          variant="inherit"
          href="/diary"
          sx={{
            color: "#fff",
            "&:hover": { color: "#5D915D", transition: "ease-in .2s" },
          }}
        >
          Diary
        </Button>
      </Toolbar>
    </AppBar>
  );
};
