import { combineReducers } from 'redux'
import userReducer from './userReducer';
import { loadingReducer, notificationReducer } from './utilsReducer';

export default combineReducers({
  user: userReducer,
  loading: loadingReducer,
  notification: notificationReducer
})

