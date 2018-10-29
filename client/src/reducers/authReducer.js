import { SET_CURRENT_USER } from '../actions/types';
import Helpers from '../helpers/helpers';

const initialState = {
    isAuthenticated: false,
    user: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !Helpers.isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}