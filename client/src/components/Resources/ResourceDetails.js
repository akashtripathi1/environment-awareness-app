import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const ResourceDetails = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Resource Details
      </Typography>
      <Typography variant="body1">
        {/* Display detailed information about the resource here */}
      </Typography>
    </Container>
  );
}

export default ResourceDetails;
