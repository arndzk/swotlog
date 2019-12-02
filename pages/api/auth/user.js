import fetch from 'node-fetch';
import { parse } from 'cookie'

import { EXTERNAL_API_PORT } from 'constants/misc';

export default async (req, res) => {
  const { uid, token } = parse(req.headers.cookie)

  const request = await fetch(`http://localhost:${EXTERNAL_API_PORT}/users/${uid}`, {
    method: 'POST',
    credentials: 'include',
		headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  const user = await request.json();

  res.status(request.status).json(user);
}