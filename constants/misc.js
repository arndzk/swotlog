export const PAGE_TITLES = {
  'signin': 'Sign In',
  'signup': 'Sign Up'
}

export const EXTERNAL_API_PORT = 3001;
// routes only guest should access
export const GUEST_ZONES = ['/signin', '/signup'];

// routes only auth user should access
export const USER_ZONES = ['/profile'];

export const AUTH_COOKIE_NAME = 'token';

export const USER_COOKIE = 'uid';

export const API_URL = 'http://localhost:3000/api';