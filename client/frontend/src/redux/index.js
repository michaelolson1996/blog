import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import categories from './categories';
import posts from './posts';
import payments from './stripe';
import emailSuccess from './email';

const rootReducer = combineReducers({
    emailSuccess,
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