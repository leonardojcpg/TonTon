import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';


export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#141414' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          {/* Ícone do menu aqui */}
        </IconButton>
        <Typography variant="h6"  href="/" component="div" sx={{ flexGrow: 1, fontFamily: 'Arial', color: '#dfdeda' }}>
          TonTon
        </Typography>
        <Button color="inherit" href="/">
          Home
        </Button>
        <Button color="inherit" href="/feeding">
          Feeding
        </Button>
        <Button color="inherit" href="/breastfeeding">
            Breast-Feeding
        </Button>
        <Button color="inherit" href="/sleep">
          Sleep
        </Button>
        <Button variant="inherit" href="/diapers">
          Diapers
        </Button>
        <Button variant="inherit" href="/diary">
          Diary 
        </Button>
      </Toolbar>
    </AppBar>
  );
};
