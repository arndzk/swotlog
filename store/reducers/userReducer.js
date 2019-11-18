import { AUTH_RESPONSE, LOGOUT } from '../actions';

const initialState = {
  id: null,
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: null
};

export default (state = initialState, action) => {
  const { user, type } = action;

  switch(type) {
    case AUTH_RESPONSE:
      return state = {
        ...state,
        ...user,
      };

    case LOGOUT:
      return state = {
        ...state,
        ...initialState,
      };
      
    default: 
      return state;
  }
}