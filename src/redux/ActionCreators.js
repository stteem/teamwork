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
        token: response.token
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
            localStorage.setItem('creds', JSON.stringify(creds));
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