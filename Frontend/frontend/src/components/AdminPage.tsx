import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter a valid search term.'); // Alert for empty query
      return;
    }
    // Navigate to the results page with the search query
    navigate('/results', { state: { query: searchQuery } });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5">Admin Page</Typography>
      <TextField
        label="Search Songs"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default AdminPage;
