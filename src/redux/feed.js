import * as ActionTypes from './ActionTypes';

export const Feed = (state = {
        isLoading: true,
        errMess: null,
        feeds: [],
        feed: []
    }, action) => {
    switch(action.type) {

        // Load feed
        case ActionTypes.FEED_LOADED:
            return {...state, isLoading: false, errMess: null, feeds: action.payload, feed: []};

        case ActionTypes.FEED_LOADING:
            return {...state, isLoading: true, errMess: null, feeds: [], feed: []};

        case ActionTypes.FEED_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};



        // Store posted image for feed rendering
        case ActionTypes.POST_GIF_LOADING:
            return {...state, isLoading: true, errMess: null, feed: []};

        case ActionTypes.ADD_IMAGE:
            var feed = action.payload;
            return {...state, isLoading: false, errMess: null, feed: state.feed.concat(feed)};

        case ActionTypes.POST_GIF_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feed: []};



        // Store posted article for feed rendering
        case ActionTypes.ADD_ARTICLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};

        case ActionTypes.ADD_ARTICLE:
            var article = action.payload;
            return {...state, isLoading: false, errMess: null, feed: state.feed.concat(article)};

        default:
            return state;
    }
}