import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import contactReducer from './reducers/contactReducer';
import rootSaga from './sagas/rootSaga';

const saga = createSagaMiddleware();
const rootReducer = combineReducers({ auth: authReducer, contacts: contactReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(saga)));
saga.run(rootSaga);
export default store;