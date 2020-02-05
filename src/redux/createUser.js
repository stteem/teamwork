import * as ActionTypes from './ActionTypes';

export const RegisterUser = (state = {
        isLoading: true,
        errMess: null,
        message: null
    }, action) => {
    switch(action.type) {

        // Create User
        case ActionTypes.CREATE_USER:
            return {...state, isLoading: false, errMess: null, message: action.payload};

        case ActionTypes.CREATE_USER_LOADING:
            return {...state, isLoading: true, errMess: null, message: null};

        case ActionTypes.CREATE_USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, message: null};

        default:
            return state;
    }
}