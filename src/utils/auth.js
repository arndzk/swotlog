import { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = ({ token }) => {
  cookie.set('token', token, { expires: 1 });
  Router.push('/profile');
}

export const auth = ctx => {
  const { token } = nextCookie(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
  }

  if (!token) {
    Router.push('/login');
  }

  return token;
}

export const logout = () => {
  cookie.remove('token');
  window.localStorage.setItem('logout', Date.now());
  Router.push('/login');
}

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('Logged Out');
        Router.push('/login');
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [null])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  }

  return Wrapper;
}