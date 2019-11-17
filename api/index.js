export const requestAuthentication = ({ email, password }) => {
	const fetch = window ? window.fetch : require('node-fetch');

	return fetch('http://192.168.1.106:3000/login', {
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
      
    return r.json()
  })
};