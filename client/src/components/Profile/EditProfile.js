// src/components/Profile/EditProfile.js
import React, { useState, useContext, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfileContext from '../../context/profile/profileContext';

const EditProfile = () => {
  
  const navigate = useNavigate();

  const profileContext = useContext(ProfileContext);

  const {  bio, interests, updateProfile } = profileContext;
  

  const [profile, setProfile] = useState({
    bio: bio,
    interests: interests,
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };


  const handleSave = async () => {

    setProfile({
      ...profile,
      bio,
      interests: profile.interests.split(',').map(interest => interest.trim())
    });
    await updateProfile(profile);
    // console.log(profile.interests);
    navigate('/profile');
  };

  return (
    <Container maxWidth="sm">
    <Typography variant="h4" component="h1" gutterBottom>
      Edit Profile
    </Typography>

    <TextField
      label="Bio"
      fullWidth
      margin="normal"
      name="bio"
      value={profile.bio}
      onChange={handleChange}
    />
    <TextField
      label="Interests"
      fullWidth
      margin="normal"
      name="interests"
      value={profile.interests}
      onChange={handleChange}
    />

    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={handleSave}
    >
      Save
    </Button>
  </Container>
  );
}

export default EditProfile;
