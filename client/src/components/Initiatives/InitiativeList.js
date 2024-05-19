import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function InitiativeList() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Environmental Initiatives
      </Typography>
      <Grid container spacing={3}>
        {/* Map through initiatives and render each as a Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Initiative Title</Typography>
              <Typography variant="body2">Initiative Description</Typography>
              <Button component={Link} to="/initiatives/1">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InitiativeList;
