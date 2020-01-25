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

        /*case ActionTypes.POST_GIF_LOADING:
            return {...state, isLoading: true, errMess: null, feed: []};*/

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


        // Delete and remove image from feed
        case ActionTypes.DELETE_IMAGE:
            return {...state, feeds: state.feeds.filter(feed => feed.itemid !== action.payload) };

        case ActionTypes.DELETE_IMAGE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};


        // Update article in feed
        case ActionTypes.UPDATE_ARTICLE:
            return {...state, feeds: state.feeds.map(feed => feed.itemid !== action.payload.itemid ? feed : {...feed, ...action.payload} )};

        case ActionTypes.UPDATE_ARTICLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};

        default:
            return state;
    }
}