import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/layout';
import { login } from '../utils/auth';

function Login () {
  const [userData, setUserData] = useState({ username: '', error: '' });

  async function handleSubmit (event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const username = userData.username;
    const url = '/api/login';

    try {
      const response = await fetch(url, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })
      if (response.status === 200) {
        const { token } = await response.json();
        await login({ token });
      } else {
        console.log('Login Failed');
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error(
        'Some Error',
        error
      )

      const { response } = error
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      )
    }
  }

  return (
    <Layout>
      <div className='login'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Your GitHub Username</label>

          <input
            type='text'
            id='username'
            name='username'
            value={userData.username}
            onChange={event =>
              setUserData(
                Object.assign({}, userData, { username: event.target.value })
              )
            }
          />

          <button type='submit'>Login</button>

          {userData.error && <p className='error'>Error: {userData.error}</p>}
        </form>
      </div>

    </Layout>
  )
}

export default Login