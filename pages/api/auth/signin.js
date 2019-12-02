import fetch from 'node-fetch';
import { serialize } from 'cookie'

import { EXTERNAL_API_PORT } from 'constants/misc';

const MAX_AGE = 365 * 24 * 60 * 60 * 1000;

export default async (req, res) => {
  const response = await fetch(`http://localhost:${EXTERNAL_API_PORT}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
    },
		body: JSON.stringify({
      email: req.body.email,
      password: req.body.password
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