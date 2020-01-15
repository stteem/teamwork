import * as ActionTypes from './ActionTypes';

export const Item = (state = {
        isLoading: true,
        errMess: null,
        item: [],
        comment: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ITEM_AND_COMMENTS:
            return {...state, isLoading: false, errMess: null, item: action.payload, comment: []};

        case ActionTypes.ITEM_AND_COMMENTS_LOADING:
            return {...state, isLoading: true, errMess: null, item: [], comment: []};

        case ActionTypes.ITEM_AND_COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, item: [], comment: []};

        case ActionTypes.ADD_COMMENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, item: [], comment: []};

        case ActionTypes.ADD_COMMENT:
            var comment = action.comment;
            return {...state, comment: state.comment.concat(comment)};

        default:
            return state;
    }
}