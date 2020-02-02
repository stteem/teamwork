import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Auth } from './auth';
import { Feed } from './feed';
import { Item } from './imageid';
import { Article } from './articleid';
import { RegisterUser } from './createUser';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialUser } from './forms';




export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            feeds: Feed,
            item: Item,
            article: Article,
            createduser: RegisterUser,
            ...createForms({
                reguser: InitialUser
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}