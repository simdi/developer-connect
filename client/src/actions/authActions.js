import axios from 'axios';
import { GET_ERRORS } from './types';

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