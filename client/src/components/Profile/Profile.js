// src/components/Profile/Profile.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Button, Chip, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'
import ProfileContext from '../../context/profile/profileContext';

const Profile = () => {
  const { user, loadUser} = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);
  const { bio, interests, ecoFriendlyActions, posts, followers, loadProfile } = profileContext;
  const [ name , setName ] = useState('User Name');
  
  useEffect(() => {
    loadProfile();
    loadUser();
  }, []);
  
  useEffect(()=> {
    if(user){
      setName(user.name);
    }
  },[user]);
  

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body1">{bio}</Typography>
      <div style={{ margin: '10px 0' }}>
        {interests && interests.map((interest, index) => (
          <Chip key={index} label={interest} style={{ margin: '5px' }} />
        ))}
      </div>
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
      <Typography variant="h6">Followers: {followers.length}</Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/profile/edit"
      >
        Edit Profile
      </Button>
    </Container>
  );
};

export default Profile;
