import NextApp from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { Provider, connect } from 'react-redux'
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga'
import { parseCookies, destroyCookie } from 'nookies'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Preloader from 'components/Preloader';
import Toast from 'components/Toast';
import Navigation from 'components/Navigation';

import { PAGE_TITLES } from 'constants/misc';
import { setLoading } from 'actions/misc';
import configureStore from '../store';
import { fetchUserInfo } from 'actions/user';
import { ThemeProvider } from '@material-ui/core/styles';
import { redirectIfNecessary } from 'utils/helpers/pathManager'
import theme from 'utils/theme';

class App extends NextApp {
  componentDidMount() {
    const { setLoading } = this.props;
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);

    // TODO: (maybe) make separate actions for route change
		Router.events.on('routeChangeStart', () => setLoading(true));
		Router.events.on('routeChangeComplete', () => setLoading(false));
		Router.events.on('routeChangeError', () => setLoading(false));
  }

  render() {
    const {
      Component,
      pageProps,
      router: { asPath },
      store,
      isAuthenticated
    } = this.props;
    const [, main, sub] = asPath.split('/');
    const title = PAGE_TITLES[main];

    return (
      <>
        <Head>
          <title>{title ? `${title} | ` : ''}Swotlog</title>
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Preloader barHeight='3px' barWidth='100%' bgColor='#fff' barColor='#e6e600' />
            <Header />
            <Container
              component='main'
              {...(['signin', 'signup'].includes(main) && { maxWidth: 'xs' })}
            >
              <Component {...pageProps } />
            </Container>
            <Footer />
            <Toast />
            { isAuthenticated && !['profile', 'signin', 'signup'].includes(main) && <Navigation asPath={asPath} />}
          </ThemeProvider>
        </Provider>
      </>
    );
  }
}

App.getInitialProps = async (appContext) => {
  const { store, isServer } = appContext.ctx;
  const { uid, token } = parseCookies(appContext.ctx);
  const pageProps = await NextApp.getInitialProps(appContext);

  if (!store.getState().user.id 
    && uid && token)
      await store.dispatch(fetchUserInfo({ uid, token }));  

  if (!uid)  await destroyCookie(appContext.ctx, 'token')
  
  const isAuthenticated = token && uid || !isServer && uid;
  
  redirectIfNecessary(isAuthenticated, appContext.ctx);

  return {
    isAuthenticated,
    ...pageProps
  }
}

export default withRedux(configureStore)(
  withReduxSaga(
    connect(null, { 
      setLoading 
    })(App)))