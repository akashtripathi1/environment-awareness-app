import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const ActionsDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Eco-Friendly Actions
      </Typography>
      <Grid container spacing={3}>
        {/* Map through actions and render each as a Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Action Title</Typography>
              <Typography variant="body2">Action Description</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ActionsDashboard;
