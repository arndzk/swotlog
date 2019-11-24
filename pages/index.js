import { connect } from 'react-redux';
import HomeGuest from 'views/HomeGuest';
import Feed from 'views/Feed';

const Home = ({ user }) => {
  return <>
    {
      user.id
        ? <Feed />
        : <HomeGuest />
    }
  </>
}

// Home.getInitialProps = async (ctx) => {
//   const { store, isServer } = ctx;

//   if (!store.getState().user.id) {
//     const { uid, token } = parseCookies(ctx);
//     await store.dispatch(fetchUserInfo({ uid, token }));
//   }  

//   return { isServer }
// }

export default connect(state => ({ user: state.user }))(Home);