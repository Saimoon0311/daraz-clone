import {applyMiddleware, combineReducers, createStore} from 'redux';
import types from '../type';
import auth from './auth';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import saveProduct from './saveCartData';
import store from '../store';
import languageType from './languageSelector';

const persistConfig = {
  key: 'saveProduct',
  storage: AsyncStorage,
  whitelist: ['saveProduct'],
};
const persistConfig1 = {
  key: 'languageType',
  storage: AsyncStorage,
  whitelist: 'languageType',
};
const appReducer = combineReducers({
  auth: auth,
  savePosts: persistReducer(persistConfig, saveProduct),
  languageType: persistReducer(persistConfig1, languageType),
});
export default rootReducer = (state, action) => {
  if (action.type == types.CLEAR_REDUX_STATE) {
    state.auth = undefined;
  }
  return appReducer(state, action);
};
