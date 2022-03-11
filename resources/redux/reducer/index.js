import {applyMiddleware, combineReducers, createStore} from 'redux';
import types from '../type';
import auth from './auth';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import saveProduct from './saveCartData';
import store from '../store';

const persistConfig = {
  key: 'saveProduct',
  storage: AsyncStorage,
  whitelist: ['saveProduct'],
};
const appReducer = combineReducers({
  auth: auth,
  savePosts: persistReducer(persistConfig, saveProduct),
});
export default rootReducer = (state, action) => {
  if (action.type == types.CLEAR_REDUX_STATE) {
    state.auth = undefined;
  }
  return appReducer(state, action);
};
