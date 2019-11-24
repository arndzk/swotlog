import fetch from 'node-fetch';
import { parse } from 'cookie';

export default async (req, res) => {
  const { token } = parse(req.headers.cookie);

  const request = await fetch(`http://192.168.1.106:3000${req.body.route}`, {
		method: 'POST',
		headers: {
      'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json; charset=utf-8',
    },
  });  
  const data = await request.json();
  
  res.status(request.status).json(data);
}