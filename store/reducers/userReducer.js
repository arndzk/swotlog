import { AUTH_RESPONSE, LOGOUT } from '../actions';
import { AUTH_COOKIE_NAME } from 'constants/misc';

// const initialState = {
//   id: null,
//   email: '',
//   firstName: '',
//   lastName: '',
//   dateOfBirth: null
// };

const initialState = { //dummy
  "id": 1,
  "email": "takis@takis.gg",
  "firstName": "Takis",
  "lastName": "Takis",
  "dateOfBirth": null
};

export default (state = initialState, action) => {
  const { user, type } = action;

  switch(type) {
    case AUTH_RESPONSE:
      return {
        ...user,
      };

    case LOGOUT:
      document.cookie = `${AUTH_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`; // hacks applied 

      return {
        ...initialState,
      };
      
    default: 
      return state;
  }
}