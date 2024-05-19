import React, { useReducer } from 'react';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import axios from 'axios';
import AuthState from '../auth/AuthState';
import setAuthToken from '../../utils/setAuthToken';
import sampleProfile from './profileSample.json';
import {
    LOAD_PROFILE,
    CREATE_PROFILE,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ADD_ACTIONS
} from '../types';

const ProfileState = (props) => {
    const initialState = {
        name: "Users Name",
        user: "Users Id",
        bio: "Users Bio",
        interests: [],
        ecoFriendlyActions: [],
        posts: [],
        followers: []
    };

    const [state, dispatch] = useReducer(profileReducer, initialState);

    // Load profile with initial state or from local storage
    const loadProfile = async () => {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        try {

            const res = await axios.get('/api/profile');
    //   console.log(res.data)
            dispatch({
              type: LOAD_PROFILE,
              payload: res.data
            });
          } catch (err) {
            // dispatch({ type: AUTH_ERROR });
            console.log('profile load hai')
          }
    };
      // Register Profile
  const registerProfile = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/profile', formData, config);

      console.log(res);

      dispatch({
        type: CREATE_PROFILE,
        payload: res.data
      });

      loadProfile();
    } catch (err) {
      dispatch({
        // type: REGISTER_FAIL,
        payload: err.response.data.message
      });
    }
  };

  // Update profile
  const updateProfile = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/profile', formData, config);

      console.log(res);

      dispatch({
        type: CREATE_PROFILE,
        payload: res.data
      });

      loadProfile();
    } catch (err) {
      dispatch({
        // type: REGISTER_FAIL,
        payload: err.response.data.message
      });
    }
  };

  // Environmental actions
  const actions = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/profile/actions', formData, config);

      console.log(res);

      dispatch({
        type: ADD_ACTIONS,
        payload: res.data
      });

      loadProfile();
    } catch (err) {
      dispatch({
        // type: REGISTER_FAIL,
        payload: err.response.data.message
      });
    }
  };


    // Clear profile
    const clearProfile = () => {
        dispatch({
            type: CLEAR_PROFILE
        });
    };

    return (
        <ProfileContext.Provider
            value={{
                name: state.name,
                bio: state.bio,
                interests: state.interests,
                ecoFriendlyActions: state.ecoFriendlyActions,
                posts: state.posts,
                followers: state.followers,
                loadProfile,
                registerProfile,
                updateProfile,
                clearProfile,
                actions
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    );
};

export default ProfileState;
