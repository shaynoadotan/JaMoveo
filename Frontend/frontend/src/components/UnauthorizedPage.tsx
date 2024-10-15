import React from 'react';
import { Box, Typography } from '@mui/material';

const UnauthorizedPage: React.FC = () => {
  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" color="error">
        Unauthorized Access
      </Typography>
      <Typography variant="h6">
        This page is only accessible to admin users.
      </Typography>
    </Box>
  );
};

export default UnauthorizedPage;
