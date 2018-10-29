import axios from 'axios';
import { GET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';

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
    }).catch(err => {
      console.log('Error', err.response.data.errors);
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data.errors
      });
    });
}