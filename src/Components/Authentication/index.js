import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import usersReducer from './user';
import logger from 'redux-logger'; // Import the logger

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer
});

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger)); // Include the logger

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;
