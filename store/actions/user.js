import  { AUTH_REQUEST, AUTH_RESPONSE, 
  LOGOUT, 
  SIGN_UP,
  FETCH_USER_INFO,
  UPDATE_USER_DETAILS } from '.';

export const signUp = data => ({
  type: SIGN_UP,
  data,
});

export const requestAuthentication = (email, password) => ({
  type: AUTH_REQUEST,
  email,
  password
});

export const authenticationResponse = user => ({
  type: AUTH_RESPONSE,
  user,
});

export const fetchUserInfo = cookies => ({
  type: FETCH_USER_INFO,
  cookies
});

export const updateUserData = data => ({
  type: UPDATE_USER_DETAILS,
  data
});

export const logout = () => ({
  type: LOGOUT,
})