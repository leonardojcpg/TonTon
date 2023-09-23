import React from "react";
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

export const ResponsiveHeader = () => {
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Baby", href: "/baby"},  
    { label: "Breast-Feeding", href: "/breastfeeding" },
    { label: "Sleep", href: "/sleep" },
    { label: "Diapers", href: "/diapers" },
    { label: "Diary", href: "/diary" },
  ];

  const renderDrawer = (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.label}
            component="a"
            href={item.href}
            onClick={toggleDrawer}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
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
                href="/"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontFamily: "Roboto",
                  color: "#D6FFD6",
                }}
              >
                TonTon
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                href="/"
                component="div"
                sx={{ flexGrow: 1, fontFamily: "Roboto", color: "#D6FFD6" }}
              >
                TonTon
              </Typography>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  href={item.href}
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      color: "#5D915D",
                      transition: "ease-in .2s",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      {isMobileScreen && renderDrawer}
    </>
  );
};
