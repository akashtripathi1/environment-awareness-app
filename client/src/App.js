import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Layout/Dashboard';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import InitiativeList from './components/Initiatives/InitiativeList';
import InitiativeDetails from './components/Initiatives/InitiativeDetails';
import CreateInitiative from './components/Initiatives/CreateInitiative';
import ActionsDashboard from './components/Actions/ActionsDashboard';
import LogAction from './components/Actions/LogAction';
import Community from './components/Community/Community'
import Challenges from './components/Challenges/Challenges';
import ChallengeDetails from './components/Challenges/ChallengeDetails';
import Resources from './components/Resources/Resources';
import ResourceDetails from './components/Resources/ResourceDetails';
import CreateResource from './components/Resources/CreateResource';
import MapView from './components/Map/MapView';

import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import ProfileState from './context/profile/ProfileState';
import './App.css';

const theme = createTheme();

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthState>
        <ProfileState>


          <Router>
            <Fragment>
              <Navbar />
              <div>
                <Routes>
                  <Route exact path="/" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Fragment><Login /></Fragment>} />
                  <Route path="/register" element={<Fragment><Register /></Fragment>} />
                  <Route path="/dashboard" element={<Fragment><Home /></Fragment>} />
                  <Route path="/profile/edit" element={<Fragment><EditProfile /></Fragment>} />
                  <Route path="/profile" element={<Fragment><Profile /></Fragment>} />
                  <Route path="/initiatives/new" element={<Fragment><CreateInitiative /></Fragment>} />
                  <Route path="/initiatives/:id" element={<Fragment><InitiativeDetails /></Fragment>} />
                  <Route path="/initiatives" element={<Fragment><InitiativeList /></Fragment>} />
                  <Route path="/actions/log" element={<Fragment><LogAction /></Fragment>} />
                  <Route path="/actions" element={<Fragment><ActionsDashboard /></Fragment>} />
                  <Route path="/posts" element={<Fragment><Community /></Fragment>} />
                  <Route path="/challenges/:id" element={<Fragment><ChallengeDetails /></Fragment>} />
                  <Route path="/challenges" element={<Fragment><Challenges /></Fragment>} />
                  <Route path="/resources/new" element={<Fragment><CreateResource /></Fragment>} />
                  <Route path="/resources/:id" element={<Fragment><ResourceDetails /></Fragment>} />
                  <Route path="/resources" element={<Fragment><Resources /></Fragment>} />
                  <Route path="/map" element={<Fragment><MapView /></Fragment>} />
                </Routes>
              </div>
              <Footer />
            </Fragment>
          </Router>
        </ProfileState>
      </AuthState>
    </ThemeProvider>
  );
}

export default App;
