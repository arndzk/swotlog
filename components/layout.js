import React from 'react'
import Head from 'next/head'
import Header from './header'

const Layout = props => (
  <React.Fragment>
    <Head>
      <title>Swotlog</title>
    </Head>
    
    <Header />

    <main>
      <div className='container'>{props.children}</div>
    </main>
  </React.Fragment>
)

export default Layout