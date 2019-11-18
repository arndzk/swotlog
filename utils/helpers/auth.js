import { AUTH_COOKIE_NAME } from 'constants/misc';

/**
 * We shall check if request/document includes connect.sid cookie
 * 
 * - If yes, we will try to serve any view that requires authentication
 * Though, if connect.sid is not valid, upon api request we will get a relevant msg from
 * backend and will redirect user to e.g. /login with a message
 * 
 * - If no, redirect to e.g /login
 */
export const cookieOnRequest = ctx => !!(ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie && ctx.req.headers.cookie.includes(AUTH_COOKIE_NAME));

export const cookieOnDocument = () => document && document.cookie && document.cookie.includes(AUTH_COOKIE_NAME);