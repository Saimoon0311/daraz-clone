import {applyMiddleware, combineReducers, createStore} from 'redux';
import types from '../type';
import auth from './auth';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import saveProduct from './saveCartData';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: 'saveProduct',
};
const appReducer = combineReducers({
  auth: auth,
  savePosts: persistReducer(persistConfig, saveProduct),
});
const rootReducer = (state, action) => {
  console.log(21, state);
  if (action.type == types.CLEAR_REDUX_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
