import React from 'react';
import { Container, Typography, Button } from '@mui/material';

function InitiativeDetails() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Initiative Details
      </Typography>
      <Typography variant="body1">
        {/* Display detailed information about the initiative here */}
      </Typography>
      <Button variant="contained" color="primary">
        Join Initiative
      </Button>
    </Container>
  );
}

export default InitiativeDetails;
