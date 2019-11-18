import HomeGuest from 'views/HomeGuest';

const Home = ({ authCookiePresented }) => {
  
  return <>
    {
      authCookiePresented 
        ? <h1>welcome</h1>
        : <HomeGuest />
    }
  </>
}

export default Home;