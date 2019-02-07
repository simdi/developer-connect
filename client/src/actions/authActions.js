import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData).then(res => {
        history.push('/login');
    }).catch(err => {
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data.errors
      });
    });
}

// Login User
export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/users/login', userData).then(res => {
        // Save to local storage
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        // Set token to auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwtDecode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data.errors
        });
    });
}

// Logout User
export const logoutUser = () => dispatch => {
    // Remove user from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header from future requests
    setAuthToken(false);
    // Set current user to an empty object, and isAuthenticated to false
    dispatch(setCurrentUser({}));
}

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}