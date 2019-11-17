import { combineReducers } from 'redux'
import userReducer from './userReducer';
import { loadingReducer, errorReducer } from './utilsReducer';

export default combineReducers({
  user: userReducer,
  loading: loadingReducer,
  error: errorReducer
})

