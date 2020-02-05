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






        //POSTED FEED

        // Store posted article for feed rendering
        case ActionTypes.ADD_ARTICLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};

        case ActionTypes.ADD_ARTICLE:
            var article = action.payload;
            return {...state, isLoading: false, errMess: null, feed: state.feed.concat(article)};


        // Update posted article in feed
        case ActionTypes.UPDATE_POSTED_ARTICLE:
            return {...state, feed: state.feed.map(feed => feed.itemid !== action.payload.itemid ? feed : {...feed, ...action.payload} )};

        case ActionTypes.UPDATE_POSTED_ARTICLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};


        // Delete and remove posted article from feed
        case ActionTypes.DELETE_POSTED_ARTICLE:
            return {...state, feed: state.feed.filter(feed => feed.itemid !== action.payload) };

        case ActionTypes.DELETE_POSTED_ARTICLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};



        // Delete and remove posted image from feed
        case ActionTypes.DELETE_POSTED_IMAGE:
            return {...state, feed: state.feed.filter(feed => feed.itemid !== action.payload) };

        case ActionTypes.DELETE_POSTED_IMAGE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};





        // MAIN FEED

        // Delete and remove image from main feed
        case ActionTypes.DELETE_IMAGE:
            return {...state, feeds: state.feeds.filter(feed => feed.itemid !== action.payload) };

        case ActionTypes.DELETE_IMAGE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};


        // Update article in main feed
        case ActionTypes.UPDATE_ARTICLE:
            return {...state, feeds: state.feeds.map(feed => feed.itemid !== action.payload.itemid ? feed : {...feed, ...action.payload} )};

        case ActionTypes.UPDATE_ARTICLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};


        // Delete and remove article from main feed
        case ActionTypes.DELETE_ARTICLE:
            return {...state, feeds: state.feeds.filter(feed => feed.itemid !== action.payload) };

        case ActionTypes.DELETE_ARTICLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feeds: [], feed: []};

        default:
            return state;
    }
}