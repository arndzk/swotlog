import Router from 'next/router'
import { GUEST_ZONES, USER_ZONES } from 'constants/misc';

const redirect = (res, route) => {
  if (res) { // server
    res.writeHead(302, {
      Location: route
    });

    res.end();
  } else { // client
    Router.push(route);
  }
}
/**
 * Redirects:
 *  - Authorized users trying to access GUEST_ZONES e.g. /signin
 *  - Unauthorized users trying to acces USER_ZONES e.g. /profile
 * 
 * @param {boolean} isAuthenticated request holds sid cookie
 * @param {object} ctx ctx object of getInitialProps
 */
export const redirectIfNecessary = (isAuthenticated, { asPath, res }) => {
  if (isAuthenticated 
    && GUEST_ZONES.includes(asPath)) { 
      redirect(res, '/');
  } else if (!isAuthenticated 
    && USER_ZONES.includes(asPath)) { 
      redirect(res, '/signin');
  }
}
