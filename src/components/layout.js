import React from 'react';

// Components
import Head from 'next/head';
import Navbar from './Navbar';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const Layout = props => (
  <React.Fragment>
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
        margin: auto;
      }
    `}</style>

    <ThemeProvider theme = { theme }>
      <Navbar />
      <main>
        <div className='container'>{props.children}</div>
      </main>
    </ThemeProvider>

  </React.Fragment>
)

export default Layout;