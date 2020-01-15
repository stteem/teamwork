import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Feed } from './feed';
import { Item } from './imageid';
import { Article } from './articleid';
import thunk from 'redux-thunk';
import logger from 'redux-logger';




export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            feeds: Feed,
            item: Item,
            article: Article
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}