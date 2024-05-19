import React, { useState, useContext, useEffect } from 'react';
import { Container, Grid, TextField, Paper, Button, Typography } from '@mui/material';
import ProfileCard from '../Layout/ProfileCard';
import InitiativesCard from '../Layout/InitiativesCard';
import PostItem from '../Layout/PostItem';
import ProfileContext from '../../context/profile/profileContext'; // Import ProfileContext
import AuthContext from '../../context/auth/authContext'; // Import ProfileContext

import Alerts from '../Layout/Alerts';


const Community = () => {
  const { user, loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser(); 
  }, []); 
  // console.log(user)
  const profileContext = useContext(ProfileContext);
  const { posts, updateProfile } = profileContext; // Access posts from ProfileContext
  const [newPostText, setNewPostText] = useState('');

  const handleCreatePost = () => {
    if (newPostText.trim() !== '') {
      const updatedPosts = [{ text: newPostText, likes: 0, comments: [] }, ...posts];
      updateProfile({ posts: updatedPosts }); // Update posts in the profile context
      setNewPostText('');
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ProfileCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6">Create New Post</Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              placeholder="What's on your mind?"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              style={{ margin: '10px 0' }}
            />
            <Button variant="contained" color="primary" onClick={handleCreatePost}>Post</Button>
          </Paper>
          {posts.map((post, index) => (
            <PostItem key={index} post={post} />
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          <InitiativesCard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Community;
