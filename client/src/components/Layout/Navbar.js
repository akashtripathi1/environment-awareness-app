// Navbar.js
import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated } = authContext;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        EnviroPlatform
      </Typography>
      {isAuthenticated ? (
        <>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/profile">My Profile</Button>
          <Button color="inherit" component={Link} to="/posts">Community</Button>
          <Button color="inherit" component={Link} to="/challenges">Challenges</Button>
          <Button color="inherit" component={Link} to="/initiatives">Initiatives</Button>
          <Button color="inherit" component={Link} to="/actions">Actions</Button>
          <Button color="inherit" component={Link} to="/resources">Resources</Button>
          <Button color="inherit" component={Link} to="/map">Map</Button>
          <IconButton edge="end" color="inherit" onClick={handleMenu}>
            <Avatar alt="Profile" src="/path/to/profile-pic.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/profile">My Profile</MenuItem>
            <MenuItem onClick={() => {
              navigate('/')
              logout();
              }}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
        </>
      )}
    </Toolbar>
  </AppBar>
  );
}

export default Navbar;