import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const ChallengeDetails = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Challenge Details
      </Typography>
      <Typography variant="body1">
        {/* Display detailed information about the challenge here */}
      </Typography>
      <Button variant="contained" color="primary">
        Join Challenge
      </Button>
    </Container>
  );
}

export default ChallengeDetails;
