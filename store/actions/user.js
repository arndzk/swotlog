import  { AUTH_REQUEST, AUTH_RESPONSE, 
  LOGOUT, FETCH_USER_DETAILS, 
  FETCH_USER_INFO,
  UPDATE_USER_DETAILS } from '.';

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

export const fetchUserDetails = () => ({
  type: FETCH_USER_DETAILS,
});

export const updateUserData = data => ({
  type: UPDATE_USER_DETAILS,
  data
});

export const logout = () => ({
  type: LOGOUT,
})