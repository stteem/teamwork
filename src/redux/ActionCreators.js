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
        user: response.firstname,
        userid: response.userid,
        isadmin: response.isadmin
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
            //error.response = response;
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
            localStorage.setItem('userid', response.userid);
            localStorage.setItem('isadmin', response.isadmin);
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





// Logs the user out

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

export const postGifFailed = (errmess) => {
    return {
        type: ActionTypes.POST_GIF_FAILED,
        payload: errmess
    }
}

export const addImage = (feed) => {
    return {
        type: ActionTypes.ADD_IMAGE,
        payload: feed
    }
}

export const postGif = (title, file) => (dispatch) => {

    
     console.log('title', title)
     console.log('file', file)
    //dispatch(postGifloading(true))

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
    .then(response => dispatch(addImage(response)))
    .catch(error => dispatch(postGifFailed(error.message)));
}







// Delete Image

export const deleteFailed = (errmess) => ({
    type: ActionTypes.DELETE_IMAGE_FAILED,
    payload: errmess
});

export const deleteSuccess = (itemid) => ({
    type: ActionTypes.DELETE_IMAGE,
    payload: itemid
});



export const deleteImage = (itemid) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'api/v1/gifs/' + itemid, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(image => { console.log('Image Deleted', image); dispatch(deleteSuccess(itemid)); })
    .catch(error => dispatch(deleteFailed(error.message)));
};





//Delete Posted Image

export const deletePostedImageFailed = (errmess) => ({
    type: ActionTypes.DELETE_POSTED_IMAGE_FAILED,
    payload: errmess
});

export const deletePostedImageSuccess = (itemid) => ({
    type: ActionTypes.DELETE_POSTED_IMAGE,
    payload: itemid
});



export const deletePostedImage = (itemid) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'api/v1/gifs/' + itemid, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(image => { console.log('Image Deleted', image); dispatch(deletePostedImageSuccess(itemid)); })
    .catch(error => dispatch(deletePostedImageFailed(error.message)));
};







//FETCH IMAGE AND COMMENTS BY ID

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

    dispatch(itemLoading());

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
            //var error = new Error('Error ' + response.status + ': ' + response.statusText);
            var error = new Error('Ouch! Sorry, you have to login to proceed!');
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








//POST IMAGE COMMENT

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    comment
});

export const addCommentFailed = (errmess) => ({
    type: ActionTypes.ADD_COMMENT_FAILED,
    payload: errmess
});

export const postImageComment = (itemid, comment ) => (dispatch) => {

    const newComment = {
        imageid: itemid,
        comment: comment
    }

    console.log('Comment', newComment)

    const bearer = 'Bearer ' + localStorage.getItem('token'); 
    return fetch(baseUrl + 'api/v1/gifs/' + itemid + '/comment', {
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







//POST ARTICLE

export const addArticle = (article) => ({
    type: ActionTypes.ADD_ARTICLE,
    payload: article
});

export const addArticleFailed = (errmess) => ({
    type: ActionTypes.ADD_ARTICLE_FAILED,
    payload: errmess
});

export const postArticle = (title, text ) => (dispatch) => {

    const article = {
        newtitle: title,
        newtext: text
    }

    console.log('Comment', article)

    const bearer = 'Bearer ' + localStorage.getItem('token'); 
    return fetch(baseUrl + 'api/v1/articles', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(article)
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
    .then(response => dispatch(addArticle(response.data)))
    .catch(error => dispatch(addArticleFailed(error.message)));
}







//FETCH ARTICLE AND COMMENTS BY ID

export const addArticleAndComments = (comments) => ({
    type: ActionTypes.ADD_ARTICLE_AND_COMMENTS,
    payload: comments
});

export const articleLoading = () => {
    return {
        type: ActionTypes.ARTICLE_AND_COMMENTS_LOADING
    }
}

export const articleFailed = (errmess) => ({
    type: ActionTypes.ARTICLE_AND_COMMENTS_FAILED,
    payload: errmess
});


export const fetchArticleAndComments = (articleid) => (dispatch) => {

    dispatch(articleLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token'); 

    return fetch(baseUrl + 'api/v1/articles/' + articleid, {
        headers: { 
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            //var error = new Error('Error ' + response.status + ': ' + response.statusText);
            var error = new Error('Ouch! Sorry, you have to login to proceed!');
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addArticleAndComments(response.data)))
    .catch(error => dispatch(articleFailed(error.message)));
}





//POST ARTICLE COMMENT

export const addArticleComment = (comment) => ({
    type: ActionTypes.ADD_ARTICLE_COMMENT,
    comment
});

export const addArticleCommentFailed = (errmess) => ({
    type: ActionTypes.ADD_ARTICLE_COMMENT_FAILED,
    payload: errmess
});

export const postArticleComment = (articleid, comment ) => (dispatch) => {

    const newComment = {
        newarticleid: articleid,
        newcomment: comment
    }

    console.log('Comment', newComment)

    const bearer = 'Bearer ' + localStorage.getItem('token'); 
    return fetch(baseUrl + 'api/v1/articles/' + articleid + '/comment', {
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
    .then(response => dispatch(addArticleComment(response.data)))
    .catch(error => dispatch(addArticleCommentFailed(error.message)));
}






// Update Article

export const updateArticleFailed = (errmess) => ({
    type: ActionTypes.UPDATE_ARTICLE_FAILED,
    payload: errmess
});

export const updateArticleSuccess = (itemid) => ({
    type: ActionTypes.UPDATE_ARTICLE,
    payload: itemid
});

export const updateArticle = (itemid, title, article ) => (dispatch) => {

    const articleUpdate = {
        newitemid: itemid,
        newtitle: title,
        newarticle: article
    }

    console.log('Updated article', articleUpdate)

    const bearer = 'Bearer ' + localStorage.getItem('token'); 
    return fetch(baseUrl + 'api/v1/articles/' + itemid, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(articleUpdate)
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
    .then(response => {console.log(response.data); dispatch(updateArticleSuccess(response.data)); })
    .catch(error => dispatch(updateArticleFailed(error.message)));
}






// Update Posted Article

export const updatePostedArticleFailed = (errmess) => ({
    type: ActionTypes.UPDATE_POSTED_ARTICLE_FAILED,
    payload: errmess
});

export const updatePostedArticleSuccess = (itemid) => ({
    type: ActionTypes.UPDATE_POSTED_ARTICLE,
    payload: itemid
});

export const updatePostedArticle = (itemid, title, article ) => (dispatch) => {

    const articleUpdate = {
        newitemid: itemid,
        newtitle: title,
        newarticle: article
    }

    console.log('Updated article', articleUpdate)

    const bearer = 'Bearer ' + localStorage.getItem('token'); 
    return fetch(baseUrl + 'api/v1/articles/' + itemid, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(articleUpdate)
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
    .then(response => {console.log(response.data); dispatch(updatePostedArticleSuccess(response.data)); })
    .catch(error => dispatch(updatePostedArticleFailed(error.message)));
}





// Delete Article

export const deleteArticleFailed = (errmess) => ({
    type: ActionTypes.DELETE_ARTICLE_FAILED,
    payload: errmess
});

export const deleteArticleSuccess = (itemid) => ({
    type: ActionTypes.DELETE_ARTICLE,
    payload: itemid
});



export const deleteArticle = (itemid) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'api/v1/articles/' + itemid, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('Article Deleted', response); dispatch(deleteArticleSuccess(itemid)); })
    .catch(error => dispatch(deleteArticleFailed(error.message)));
};






// Delete Posted Article

export const deletePostedArticleFailed = (errmess) => ({
    type: ActionTypes.DELETE_POSTED_ARTICLE_FAILED,
    payload: errmess
});

export const deletePostedArticleSuccess = (itemid) => ({
    type: ActionTypes.DELETE_POSTED_ARTICLE,
    payload: itemid
});



export const deletePostedArticle = (itemid) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'api/v1/articles/' + itemid, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('Posted Article Deleted', response); dispatch(deletePostedArticleSuccess(itemid)); })
    .catch(error => dispatch(deletePostedArticleFailed(error.message)));
};




// Create new user

export const createUserIsLoading = () => {
    return {
        type: ActionTypes.CREATE_USER_LOADING
    }
}

export const addCreateUser = (message) => ({
    type: ActionTypes.CREATE_USER,
    payload: message
});

export const createUserFailed = (errmess) => ({
    type: ActionTypes.CREATE_USER_FAILED,
    payload: errmess
});


export const postNewUser = (values ) => (dispatch) => {

    dispatch(createUserIsLoading());

    console.log('User info', JSON.stringify(values))

    const bearer = 'Bearer ' + localStorage.getItem('token'); 
    return fetch(baseUrl + 'api/v1/auth/create-user', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(values)
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
    .then(response => { console.log(response.data); dispatch(addCreateUser(response.data))})
    .catch(error => dispatch(createUserFailed(error.message)));
}