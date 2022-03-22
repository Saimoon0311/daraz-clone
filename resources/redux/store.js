import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducer';

const middlewares = [thunk];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
