import NextApp from "next/app";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import { PAGE_TITLES } from "constants/misc";

import theme from "../utils/theme";
export default class App extends NextApp {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
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
            <Component {...pageProps} />
          </Container>
          <Footer />
        </ThemeProvider>
      </>
    );
  }
}
