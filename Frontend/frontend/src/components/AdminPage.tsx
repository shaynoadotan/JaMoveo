import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const AdminPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/results', { state: { query } }); // Pass the search query to results page
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ padding: 4 }}>
      <Typography variant="h5">Search any song...</Typography>
      <TextField
        label="Song Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth>Search</Button>
    </Box>
  );
};

export default AdminPage;
