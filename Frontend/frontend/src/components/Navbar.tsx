import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  username: string | null; // Username of the logged-in user
  onLogout: () => void; // Function to handle logout
}

const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout function passed as prop
    navigate('/'); // Redirect to the sign-up page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Hello {username ? username : 'Guest'}!
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
