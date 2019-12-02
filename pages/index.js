import { connect } from 'react-redux';
import { parseCookies } from 'nookies'
import HomeGuest from 'views/HomeGuest';
import Feed from 'views/Feed';

import { fetchPosts, fetchClasses } from 'actions/core';

const Home = ({ user }) => {
  return <>
    {
      user.id
        ? <Feed />
        : <HomeGuest />
    }
  </>
}

Home.getInitialProps = async (ctx) => {
  const { store } = ctx;
  const { token } = parseCookies(ctx);

  if (!store.getState().posts.length)
    await store.dispatch(fetchPosts(token))
  
  if (!store.getState().classes.length) 
    await store.dispatch(fetchClasses(token));

  return { }
}

export default connect(state => ({ user: state.user }))(Home);