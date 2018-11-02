import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.post('/api/profile').then(res => {
        console.log('Res', res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }).catch(err => {
        console.log('Error', err.response.data.errors);
        dispatch({
            type: GET_PROFILE,
            payload: {}
        });
    });
} 

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
