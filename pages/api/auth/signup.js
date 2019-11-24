import fetch from 'node-fetch';

export default async (req, res) => {
  const response = await fetch(`http://192.168.1.106:3000/users/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
    },
		body: JSON.stringify({
      ...req.body.data
		}),
  });  
  
  const { token, ...user } = await response.json();

  if (response.status === 200) {
    res.setHeader('Set-Cookie', [
      serialize('token', token, {
        httpOnly: true,
        maxAge: MAX_AGE,
        path: '/'
      }),
      serialize('uid', user.id, {
        maxAge: MAX_AGE,
        path: '/'
      })
    ]);
  }

  res.status(response.status).json(user);
}