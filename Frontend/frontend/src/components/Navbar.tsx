import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  username: string | null;
  onLogout: () => void;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ username, onLogout, isAdmin }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else if (username) {
      navigate('/player');
    } else {
      navigate('/signup'); // If not logged in, go to signup
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {username ? `Hello, ${username}` : 'Welcome'}
        </Typography>
        <Button color="inherit" onClick={handleHomeClick}>Home</Button>
        {username && (
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
