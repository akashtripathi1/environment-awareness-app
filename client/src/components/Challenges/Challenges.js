import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Challenges = ()=> {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Challenges
      </Typography>
      <Grid container spacing={3}>
        {/* Map through challenges and render each as a Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Challenge Title</Typography>
              <Typography variant="body2">Challenge Description</Typography>
              <Button component={Link} to="/challenges/1">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Challenges;
