import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const LogAction = () => {
  const [action, setAction] = useState('');
  const [description, setDescription] = useState('');

  const handleLog = () => {
    // Handle log action logic
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Log Eco-Friendly Action
      </Typography>
      <TextField
        label="Action"
        fullWidth
        margin="normal"
        value={action}
        onChange={(e) => setAction(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLog}
      >
        Log Action
      </Button>
    </Container>
  );
}

export default LogAction;
