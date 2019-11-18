import HomeGuest from 'views/HomeGuest';
import Feed from 'views/Feed';

const Home = ({ authCookiePresented }) => {
  
  return <>
    {
      authCookiePresented 
        ? <Feed />
        : <HomeGuest />
    }
  </>
}

export default Home;