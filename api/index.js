export const signUp = data =>
  fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
			'Content-Type': 'application/json; charset=utf-8',
    },
		body: JSON.stringify({
      data
		}),
  }).then(response => {
    if (response.status === 401)
      throw "Authentication error"
    
    if (response.status === 404 || response.status === 500)
      throw "Service temporarily unvailable";
      
    return response.json();
  })

export const requestAuthentication = ({ email, password }) => 
  fetch('/api/auth/signin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
    },
		body: JSON.stringify({
      email,
      password
		}),
  }).then(response => {
    if (response.status === 401)
      throw "Authentication error"
    
    if (response.status === 404 || response.status === 500)
      throw "Service temporarily unvailable";
      
    return response.json();
  })

export const fetchUserInfo = ({ token, uid }) =>
  (typeof window !== 'undefined' ? window.fetch : require('node-fetch'))('http://localhost:3000/api/auth/user', {
    method: 'POST',
    credentials: 'include',
    ...(typeof window === 'undefined' && {
      headers: {
        cookie: `token=${token}; uid=${uid}`
      },
    })
  }).then(response => {
    if (response.status === 401)
      throw "Authentication error"
  
    if (response.status === 404 || response.status === 500)
      throw "Service temporarily unvailable";
      
    return response.json();
  });

export const doFetch = ({ token, route }) =>
  (typeof window !== 'undefined' ? window.fetch : require('node-fetch'))('http://localhost:3000/api', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ route }),
    headers: {
			'Content-Type': 'application/json; charset=utf-8',
      ...(typeof window === 'undefined' && {
        cookie: `token=${token};`
      })
    },
  }).then(response => {
    if (response.status === 401)
      throw "Authentication error"
  
    if (response.status === 404 || response.status === 500)
      throw "Service temporarily unvailable";
      
    return response.json();
  })