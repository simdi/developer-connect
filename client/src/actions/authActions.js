import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData).then(res => {
      console.log('Res', res);
        history.push('/login');
    }).catch(err => {
      console.log('Error', err.response.data.errors);
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data.errors
      });
    });
}

// Login User
export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/users/login', userData).then(res => {
      console.log('Res', res);
        // Save to local storage
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        // Set token to auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwtDecode(token);
        console.log('decoded Data', decoded);
        // Set current user
        dispatch(setCurrentUser(decoded));
    }).catch(err => {
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data.errors
      });
    });
}

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}