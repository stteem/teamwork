import * as ActionTypes from './ActionTypes';

export const Item = (state = {
        isLoading: true,
        errMess: null,
        item: [],
        comment: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, item: action.payload, comment: []};

        case ActionTypes.COMMENTS_LOADING:
            return {...state, isLoading: true, errMess: null, item: [], comment: []};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, item: [], comment: []};

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, feed: state.comment.concat(comment)};

        default:
            return state;
    }
}