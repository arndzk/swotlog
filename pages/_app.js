import NextApp from "next/app";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import { PAGE_TITLES } from "constants/misc";
import { cookieOnRequest, cookieOnDocument } from 'utils/helpers/auth';
import { redirectIfNecessary } from 'utils/helpers/pathManager';

import theme from "../utils/theme";

export default class App extends NextApp {
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
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const {
      Component,
      pageProps,
      authCookiePresented,
      router: { asPath }
    } = this.props;
    const [, main, sub] = asPath.split("/");
    const title = PAGE_TITLES[main];

    return (
      <>
        <Head>
          <title>{title ? `${title} | ` : ""}Swotlog</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Container
            component="main"
            {...(["signin", "signup"].includes(main) && { maxWidth: "xs" })}
          >
            <Component {...pageProps } authCookiePresented={authCookiePresented} />
          </Container>
          <Footer />
        </ThemeProvider>
      </>
    );
  }
}
