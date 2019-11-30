import fetch from 'node-fetch';
import { parse } from 'cookie';

const normalizeResponse = response => {
  if (response.status >= 200 && response.status < 300) {
    if (response.json) // Takis loves strings
      return response.json();
    else
      return {
        error: 'Takis returned a string again!',
        response: response.text(),
      }
  }

  return response.json()
    .catch(() => ({
      error: response.statusText
    })).then(json => ({
      error: json.message || response.statusText
    }));
}

export default async (req, res) => {
  const { route, ...rest } = req.body;
  let response, cookies;
  
  if (req.headers.cookie)
    cookies = parse(req.headers.cookie);

  const request = await fetch(`http://192.168.1.106:3000${route}`, {
    method: 'POST',
    headers: {
      ...(cookies?.token && {
        'Authorization': `Bearer ${cookies.token}`,
      }),
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...(rest && {
      body: JSON.stringify(rest),
    }),
  });  

  response = await normalizeResponse(request)
  
  res.status(request.status).json(response);
}