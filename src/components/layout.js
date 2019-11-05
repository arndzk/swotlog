import React, { Fragment } from 'react';

// Components
import Head from 'next/head';
import Navbar from './Navbar';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const Layout = props => (
  <Fragment>
    <Head>
      <title>Swotlog</title>
    </Head>

    <style jsx global>{`
      body {
        font-family: 'Roboto', sans-serif;
      }
      .container {
        margin: 80px auto 0 auto;
        max-width: 1200px;
      }
      .nav-container {
        margin-left: auto;
      }
    `}</style>

    <ThemeProvider theme = { theme }>
      <Navbar />
      <main>
        <div className='container'>{props.children}</div>
      </main>
    </ThemeProvider>
  </Fragment>
);

export default Layout;