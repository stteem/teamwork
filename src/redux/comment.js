import * as ActionTypes from './ActionTypes';

export const Comment = (state = {
        errMess: null,
        comment: []
    }, action) => {
    switch(action.type) {

        case ActionTypes.ADD_COMMENT:
            var comment = action.comment;
            return {...state, errMess: null, comment: state.comment.concat(comment)};


        case ActionTypes.ADD_COMMENT_FAILED:
            return {...state, errMess: action.payload, comment: []};


        default:
            return state;
    }
}