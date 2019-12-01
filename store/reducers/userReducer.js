import { AUTH_RESPONSE, LOGOUT,
  USER_DETAILS_UPDATED,
  USER_INFO_FETCHED,
  CLASSES_FETCHED } from '../actions';
import { USER_COOKIE } from 'constants/misc';

const initialState = {
  id: null,
  email: '',
  firstName: 'A man',
  lastName: 'has no name',
};

export default (state = initialState, action) => {
  const { hasSubscribed, hasPassed, user, type } = action;

  switch(type) {
    case AUTH_RESPONSE:
    case USER_INFO_FETCHED:
      return {
        ...state,
        ...user,
      };

    case USER_DETAILS_UPDATED:
      const { classes, ...rest } = user;
     
      return {
        ...state,
        ...rest,
      }
    
    case CLASSES_FETCHED:
      return {
        ...state,
        hasSubscribed,
        hasPassed
      }
      
    case LOGOUT:
      document.cookie = `${USER_COOKIE}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`; // hacks applied 

      return {
        ...initialState,
      };
      
    default: 
      return state;
  }
}