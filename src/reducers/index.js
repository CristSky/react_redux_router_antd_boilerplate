import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {history} from './../utils/history'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
// reducers
import {login} from "./login"
// import my_reducers...


const middleware = [thunk],
    reducers = combineReducers({
        login,
        // my_reducers...
        routing: routerReducer
    });


middleware.push(routerMiddleware(history));

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
);

export default createStore(reducers, enhancer);
// or bellow without DEVTOOLS
// export default createStore(reducers, applyMiddleware(...middleware));







