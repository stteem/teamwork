import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Feed } from './feed';
import { Gif } from './postGif';
import { Item } from './getItemById';
import thunk from 'redux-thunk';
import logger from 'redux-logger';




export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            feeds: Feed,
            gif: Gif,
            item: Item
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}