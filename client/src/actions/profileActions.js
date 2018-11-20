import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, GET_ERRORS, SET_CURRENT_USER, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile').then(res => {
        dispatch({
            type: GET_PROFILE,
            payload: (res.data.data.length > 0) ? res.data.data[0] : {}
        });
    }).catch(err => {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        });
    });
} 


// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/${handle}`).then(res =>
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    ).catch(err =>
        dispatch({
            type: GET_PROFILE,
            payload: null
        })
    );
  };
  
  // Create Profile
  export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData).then(res => {
        console.log('Create Profile', res);
        history.push('/dashboard');
    }).catch(err => {
        console.log('Error', err.response.data);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data.errors
        });
    });
  };
  
  // Add experience
  export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData).then(res => {
        history.push('/dashboard')
    }).catch(err => {
        console.log('Error', err.response.data.errors);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data.errors
        });
    });
  };
  
  // Add education
  export const addEducation = (eduData, history) => dispatch => {
    axios.post('/api/profile/education', eduData).then(res => {
        history.push('/dashboard')
    }).catch(err => {
        console.log('Error', err.response.data.errors);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.errors
        });
    });
  };
  
  // Delete Experience
  export const deleteExperience = id => dispatch => {
    axios.delete(`/api/profile/experience/${id}`).then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: (res.data.data.length > 0) ? res.data.data[0] : {}
        });
    }).catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.errors
        });
    });
  };
  
  // Delete Education
  export const deleteEducation = id => dispatch => {
    axios.delete(`/api/profile/education/${id}`).then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: (res.data.data.length > 0) ? res.data.data[0] : {}
        })
    }).catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.errors
        });
    });
  };
  
  // Get all profiles
  export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/all').then(res => {
        console.log('Get Profiles', res);
        dispatch({
          type: GET_PROFILES,
          payload: res.data.data
        })
    }).catch(err => {
        console.log('Error', err.response.data.errors);
        dispatch({
          type: GET_PROFILES,
          payload: null
        })
    });
  };
  
  // Delete account & profile
  export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      axios
        .delete('/api/profile')
        .then(res =>
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  };

// Set loader
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Clear current profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}
