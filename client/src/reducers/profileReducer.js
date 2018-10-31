import { GET_PROFILE, PROFILE_LOADING } from '../actions/types';
import Helpers from '../helpers/helpers';

const initialState = {
    profile: null,
    profiles: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        default:
            return state;
    }
}