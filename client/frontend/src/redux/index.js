import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import categories from './categories';
import posts from './posts';
import payments from './stripe';

const rootReducer = combineReducers({
    categories,
    posts,
    payments
});

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSIONS__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);