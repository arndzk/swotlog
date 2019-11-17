import  { AUTH_REQUEST, AUTH_RESPONSE, LOGOUT } from '.';

export const requestAuthentication = () => ({
  type: AUTH_REQUEST,
});

export const authenticationResponse = user => ({
  type: AUTH_RESPONSE,
  user,
});

export const logout = () => ({
  type: LOGOUT,
})