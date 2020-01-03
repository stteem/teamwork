import * as ActionTypes from './ActionTypes';

export const Feed = (state = {
        isLoading: true,
        errMess: null,
        feeds: [],
        feed: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.FEED_LOADED:
            return {...state, isLoading: false, errMess: null, feeds: action.payload, feed: []};

        case ActionTypes.FEED_LOADING:
            return {...state, isLoading: true, errMess: null, feeds: [], feed: []};

        case ActionTypes.FEED_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};

        case ActionTypes.ADD_FEED:
            var feed = action.payload;
            return {...state, feed: state.feed.concat(feed)};

        default:
            return state;
    }
}