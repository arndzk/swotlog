/**
 * We shall check if request/document includes sid cookie
 * 
 * - If yes, we will try to serve any view that requires authentication
 * Though, if sid is not valid, upon api request we will get a relevant msg from
 * backend and will redirect user to e.g. /login with a message
 * 
 * - If no, redirect to e.g /login
 */
export const cookieOnRequest = ctx => !!(ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie && ctx.req.headers.cookie.includes('sid='));

export const cookieOnDocument = () => document && document.cookie && document.cookie.includes('sid=');