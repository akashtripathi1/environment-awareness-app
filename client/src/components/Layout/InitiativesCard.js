import React from 'react';
import { Paper, Typography } from '@mui/material';

const InitiativesCard = () => {
  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6">Initiatives</Typography>
      <Typography variant="body1">This is where information about initiatives will go.</Typography>
    </Paper>
  );
}

export default InitiativesCard;
