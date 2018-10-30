import { SET_CURRENT_USER } from '../actions/types';
import Helpers from '../helpers/helpers';

const initialState = {
    profiles: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case :
            return {
                ...state,
            }
        default:
            return state;
    }
}