import  { AUTH_REQUEST, AUTH_RESPONSE, LOGOUT } from '.';

export const requestAuthentication = (email, password) => ({
  type: AUTH_REQUEST,
  email,
  password
});

export const authenticationResponse = user => ({
  type: AUTH_RESPONSE,
  user,
});

export const logout = () => ({
  type: LOGOUT,
})