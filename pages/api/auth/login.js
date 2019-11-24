import fetch from 'node-fetch';
import { serialize } from 'cookie'

const MAX_AGE = 365 * 24 * 60 * 60 * 1000;

export default async (req, res) => {
  const request = await fetch(`http://192.168.1.106:3000/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
    },
		body: JSON.stringify({
      email: req.body.email,
      password: req.body.password
		}),
  });  
  const { token, user } = await request.json();
  
  if (request.status === 200) {
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

  res.status(request.status).json(user);
}