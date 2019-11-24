import fetch from 'node-fetch';
import { parse } from 'cookie'

export default async (req, res) => {
  const { uid, token } = parse(req.headers.cookie)
  
  const request = await fetch(`http://192.168.1.106:3000/users/${uid}`, {
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