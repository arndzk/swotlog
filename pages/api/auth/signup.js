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
  
  const data = await response.json();

  res.status(response.status).json(data);
}