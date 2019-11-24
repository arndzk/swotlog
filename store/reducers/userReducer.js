import { AUTH_RESPONSE, LOGOUT, 
  USER_DETAILS, USER_DETAILS_UPDATED,
  USER_INFO_FETCHED } from '../actions';
import { AUTH_COOKIE_NAME } from 'constants/misc';

export default (state = {
  id: null,
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  subs: [],
  passed: []
}, action) => {
  const { user, userDetails, type } = action;

  switch(type) {
    case AUTH_RESPONSE:
    case USER_INFO_FETCHED:
      return {
        ...state,
        ...user,
      };

    case USER_DETAILS: 
      return {
        ...state,
        ...userDetails,
      }

    case USER_DETAILS_UPDATED: 
      console.log('UPDATED DATA HEREEE!!!11!1ena!');
    
      return {
        ...state,
      }
    case LOGOUT:
      document.cookie = `${AUTH_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`; // hacks applied 

      return {
        ...initialState,
      };
      
    default: 
      return state;
  }
}