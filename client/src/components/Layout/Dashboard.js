import React, { useState, useContext, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import ProfileCard from './ProfileCard';
import InitiativesCard from './InitiativesCard';
import ProfileContext from '../../context/profile/profileContext'; // Import ProfileContext
import AuthContext from '../../context/auth/authContext'; // Import ProfileContext
import Alerts from './Alerts';

const Dashboard = () => {
  const { loadUser} = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);
  const { ecoFriendlyActions, posts, loadProfile } = profileContext;
  
  
  useEffect(() => {
    loadProfile();
    loadUser();
  }, []);
  




  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ProfileCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ margin: '20px 0' }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Eco-Friendly Actions
              </Typography>
              <List>
                {ecoFriendlyActions && ecoFriendlyActions.map((action, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={action.action} secondary={`Date: ${new Date(action.date).toLocaleDateString()}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Card style={{ margin: '20px 0' }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Posts
              </Typography>
              <List>
                {posts && posts.map((post, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={post.content} secondary={`Date: ${new Date(post.date).toLocaleDateString()}`} />
                    <Typography variant="body2">Likes: {post.likes.length}</Typography>
                    <List>
                      {post.comments && post.comments.map((comment, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={comment.content} secondary={`By: ${comment.user} on ${new Date(comment.date).toLocaleDateString()}`} />
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <InitiativesCard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
