import React, {useState, useContext, useEffect} from 'react';
import { Paper, Avatar, Typography } from '@mui/material';
import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/auth/authContext'
const ProfileCard = ()=> {
  const profileContext = useContext(ProfileContext);
  const { bio, interests, loadProfile } = profileContext;
  const { user, loadUser } = useContext(AuthContext)
  useEffect(() => {
    loadUser(); 
    loadProfile();
  }, []);

  const [ name, setName ] = useState('User Name')
  useEffect(()=> {
    if(user){
      setName(user.name);
    }
  },[user]);
  
  return (
    <Paper style={{ padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
      <Avatar alt="User Name" src="/path/to/profile-pic.jpg" style={{ width: 100, height: 100, margin: '0 auto' }} />
      <Typography variant="h6" style={{ marginTop: '10px' }}>{name}</Typography>
      <Typography variant="body1">{bio}</Typography>
    </Paper>
  );
}

export default ProfileCard;
