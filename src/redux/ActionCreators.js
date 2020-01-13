import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        user: response.firstname
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'api/v1/auth/signin', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            console.log('response', response)
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            console.log('error', error)
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
        console.log('response.json', response)
        if (response) {
            // If login was successful, set the token in local storage
            const storage = localStorage.setItem('token', response.token);
            localStorage.setItem('user', response.firstname);
            console.log('storage', storage)
            // Dispatch the success action
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}


// FEED

export const feedLoading = () => {
    return {
        type: ActionTypes.FEED_LOADING,
    }
}

export const feedLoaded = (feeds) => {
    return {
        type: ActionTypes.FEED_LOADED,
        payload: feeds
    }
}
  
export const feedFailed = (errmess) => {
    return {
        type: ActionTypes.FEED_FAILED,
        payload: errmess
    }
}

export const fetchFeed = () => (dispatch) => {
    dispatch(feedLoading(true));

    return fetch(baseUrl + 'api/v1/feed')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(feedLoaded(response.data)))
        .catch(error => dispatch(feedFailed(error.message)));
}


//Post Gif

export const postGifloading = () => {
    return {
        type: ActionTypes.POST_GIF_LOADING
    }
}

export const postGifSuccess = (data) => {
    return {
        type: ActionTypes.POST_GIF_SUCCESS,
        payload: data
    }
}

export const postGifFailed = (errmess) => {
    return {
        type: ActionTypes.POST_GIF_FAILED,
        payload: errmess
    }
}

export const addFeed = (feed) => {
    return {
        type: ActionTypes.ADD_FEED,
        payload: feed
    }
}

export const postGif = (title, file) => (dispatch) => {

    
     console.log('title', title)
     console.log('file', file)
    dispatch(postGifloading(true))

    const form = new FormData();
    form.append('title', title);
    form.append('image', file);

    const bearer = 'Bearer ' + localStorage.getItem('token'); 
    console.log('form', form)
    return fetch(baseUrl + 'api/v1/gifs', {
        method: 'POST',
        headers: { 
            'Authorization': bearer
        },
        body: form
    })
    .then(response => {
        if (response.ok) {
            console.log('response', response)
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            console.log('error', error)
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => dispatch(addFeed(response)))
    //.then(response => dispatch(postGifSuccess(response)))
    .catch(error => dispatch(postGifFailed(error.message)));
}


//FETCH COMMENTS

export const addItemAndComments = (comments) => ({
    type: ActionTypes.ADD_ITEM_AND_COMMENTS,
    payload: comments
});

export const itemLoading = () => {
    return {
        type: ActionTypes.ITEM_AND_COMMENTS_LOADING
    }
}

export const itemFailed = (errmess) => ({
    type: ActionTypes.ITEM_AND_COMMENTS_FAILED,
    payload: errmess
});


export const fetchImageAndComments = (itemid) => (dispatch) => {

    dispatch(itemLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token'); 

    return fetch(baseUrl + 'api/v1/gifs/' + itemid, {
        headers: { 
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addItemAndComments(response.data)))
    .catch(error => dispatch(itemFailed(error.message)));
}



//POST COMMENT

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    comment
});

export const addCommentFailed = (errmess) => ({
    type: ActionTypes.ADD_COMMENT_FAILED,
    payload: errmess
});

export const postComment = (itemId, comment ) => (dispatch) => {

    const newComment = {
        imageid: itemId,
        comment: comment
    }

    console.log('Comment', newComment)

    const bearer = 'Bearer ' + localStorage.getItem('token'); 
    return fetch(baseUrl + 'api/v1/gifs/' + itemId + '/comment', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(newComment)
    })
    .then(response => {
        if (response.ok) {
            console.log('response', response)
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            console.log('error', error)
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response.data)))
    .catch(error => dispatch(addCommentFailed(error.message)));
}


