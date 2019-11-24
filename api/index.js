export const requestAuthentication = ({ email, password }) => 
  fetch('/api/auth/login', {
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
  })