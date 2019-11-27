import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Feed } from './feed';
import thunk from 'redux-thunk';
import logger from 'redux-logger';




export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            feeds: Feed
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}