import * as ActionTypes from './ActionTypes';

export const Article = (state = {
        isLoading: true,
        errMess: null,
        article: [],
        comment: []
    }, action) => {
    switch(action.type) {

        // Fetch article and comments
        case ActionTypes.ADD_ARTICLE_AND_COMMENTS:
            return {...state, isLoading: false, errMess: null, article: action.payload, comment: []};

        case ActionTypes.ARTICLE_AND_COMMENTS_LOADING:
            return {...state, isLoading: true, errMess: null, article: [], comment: []};

        case ActionTypes.ARTICLE_AND_COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, article: [], comment: []};


        // Add comments to article
        case ActionTypes.ADD_ARTICLE_COMMENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, article: [], comment: []};

        case ActionTypes.ADD_ARTICLE_COMMENT:
            var comment = action.comment;
            return {...state, comment: state.comment.concat(comment)};

        default:
            return state;
    }
}