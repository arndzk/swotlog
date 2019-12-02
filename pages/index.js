import { connect } from 'react-redux';
import { parseCookies } from 'nookies'
import HomeGuest from 'views/HomeGuest';
import Feed from 'views/Feed';

import { fetchPosts, fetchClasses, fetchRelated } from 'actions/core';

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

  if (store.getState().user.id) {
    if (!store.getState().posts.length)
      await store.dispatch(fetchPosts(token))
    
    if (!store.getState().classes.length) 
      await store.dispatch(fetchClasses(token));
  
    if (!store.getState().related.length) 
      await store.dispatch(fetchRelated(token));
  }

  return { }
}

export default connect(state => ({ user: state.user }))(Home);