import NextApp from "next/app";
import Head from "next/head";
import Router from 'next/router';
import { Provider, connect } from 'react-redux'
import withRedux from "next-redux-wrapper";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import Toast from "components/Toast";

import { PAGE_TITLES } from "constants/misc";
import { cookieOnRequest, cookieOnDocument } from 'utils/helpers/auth';
import { redirectIfNecessary } from 'utils/helpers/pathManager';
import { setLoading } from 'actions/misc';
import configureStore from '../store';

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";


class App extends NextApp {
  static async getInitialProps(appContext) {
    const appProps = await NextApp.getInitialProps(appContext);
    const isServer = !!appContext.ctx.req; // TODO: verify later
    const authCookiePresented = isServer ? cookieOnRequest(appContext.ctx) : cookieOnDocument();
    
    redirectIfNecessary(authCookiePresented, appContext.ctx);

    return { 
      ...appProps,
      authCookiePresented,
     }
  }

  componentDidMount() {
    const { setLoading } = this.props;
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // TODO: (maybe) make separate actions for route change
		Router.events.on('routeChangeStart', () => setLoading(true));
		Router.events.on('routeChangeComplete', () => setLoading(false));
		Router.events.on('routeChangeError', () => setLoading(false));
  }

  render() {
    const {
      Component,
      pageProps,
      authCookiePresented,
      router: { asPath },
      store
    } = this.props;
    const [, main, sub] = asPath.split("/");
    const title = PAGE_TITLES[main];

    return (
      <>
        <Head>
          <title>{title ? `${title} | ` : ""}Swotlog</title>
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Preloader barHeight="3px" barWidth="100%" bgColor="#fff" barColor="#e6e600" />
            <Header />
            <Container
              component="main"
              {...(["signin", "signup"].includes(main) && { maxWidth: "xs" })}
            >
              <Component {...pageProps } authCookiePresented={authCookiePresented} />
            </Container>
            <Footer />
            <Toast />
          </ThemeProvider>
        </Provider>
      </>
    );
  }
}

export default withRedux(configureStore)(
	connect(
		null,
		{ setLoading }
	)(App)
);