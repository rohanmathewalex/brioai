import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = ['Home', 'Features', 'About'];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BrioAI
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {menuItems.map((item) => (
              <Button
                key={item}
                color="inherit"
                sx={{
                  '&:hover': {
                    borderBottom: '2px solid black',
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '250px', // Adjust width as needed
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '16px',
          }}
        >
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item}
              component="a"
              href="#"
              onClick={handleDrawerToggle}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  textDecorationThickness: '2px',
                },
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
