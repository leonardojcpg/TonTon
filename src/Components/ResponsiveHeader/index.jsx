import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { toast } from "react-toastify";

export const ResponsiveHeader = () => {
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logout successfully!");
    navigate("/login");
  };

  const renderDrawer = (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
      <List>
        <ListItem button component={Link} to="/" onClick={toggleDrawer}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/baby" onClick={toggleDrawer}>
          <ListItemText primary="Baby" />
        </ListItem>
        <ListItem button component={Link} to="/breastfeeding" onClick={toggleDrawer}>
          <ListItemText primary="Breast-Feeding" />
        </ListItem>
        <ListItem button component={Link} to="/sleep" onClick={toggleDrawer}>
          <ListItemText primary="Sleep" />
        </ListItem>
        <ListItem button component={Link} to="/diapers" onClick={toggleDrawer}>
          <ListItemText primary="Diapers" />
        </ListItem>
        <ListItem button component={Link} to="/diary" onClick={toggleDrawer}>
          <ListItemText primary="Diary" />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <>
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
          {isMobileScreen ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  flexGrow: 1,
                  fontFamily: "Roboto",
                  color: "#D6FFD6",
                  textDecoration: "none",
                }}
              >
                TonTon
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  flexGrow: 1,
                  fontFamily: "Roboto",
                  color: "#D6FFD6",
                  textDecoration: "none",
                }}
              >
                TonTon
              </Typography>
              {isMobileScreen ? null : (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{
                      color: "#fff",
                      "&:hover": {
                        color: "#5D915D",
                        transition: "ease-in .2s",
                      },
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/baby"
                    sx={{
                      color: "#fff",
                      "&:hover": {
                        color: "#5D915D",
                        transition: "ease-in .2s",
                      },
                    }}
                  >
                    Baby
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/breastfeeding"
                    sx={{
                      color: "#fff",
                      "&:hover": {
                        color: "#5D915D",
                        transition: "ease-in .2s",
                      },
                    }}
                  >
                    Breast-Feeding
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/sleep"
                    sx={{
                      color: "#fff",
                      "&:hover": {
                        color: "#5D915D",
                        transition: "ease-in .2s",
                      },
                    }}
                  >
                    Sleep
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/diapers"
                    sx={{
                      color: "#fff",
                      "&:hover": {
                        color: "#5D915D",
                        transition: "ease-in .2s",
                      },
                    }}
                  >
                    Diapers
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/diary"
                    sx={{
                      color: "#fff",
                      "&:hover": {
                        color: "#5D915D",
                        transition: "ease-in .2s",
                      },
                    }}
                  >
                    Diary
                  </Button>
                </>
              )}
              <Button 
              color="success" 
              onClick={logout}
              sx={{
                "&:hover": {
                  color: "red",
                  transition: "ease-in .2s",
                },

              }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {isMobileScreen && renderDrawer}
    </>
  );
};
