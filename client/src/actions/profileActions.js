import axios from 'axios';
import { GET_ERRORS, GET_PROFILE, GET_PROFILES, PROFILE_LOADING } from './types';

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

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
