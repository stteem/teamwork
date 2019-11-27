import * as ActionTypes from './ActionTypes';

export const Feed = (state = {
        isLoading: true,
        errMess: null,
        feeds: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.FEED_LOADED:
            return {...state, isLoading: false, errMess: null, feeds: action.payload};

        case ActionTypes.FEED_LOADING:
            return {...state, isLoading: true, errMess: null, feeds: []};

        case ActionTypes.FEED_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: []};

        default:
            return state;
    }
}