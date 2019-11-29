import * as ActionTypes from './ActionTypes';

export const Gif = (state = {
        isLoading: true,
        errMess: null,
        data: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.POST_GIF_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: action.payload};

        case ActionTypes.POST_GIF_LOADING:
            return {...state, isLoading: true, errMess: null, data: []};

        case ActionTypes.POST_GIF_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};

        default:
            return state;
    }
}