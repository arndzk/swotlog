import fetch from 'node-fetch';

const normalizeResponse = response => { // TODO: move to helpers
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
  let response;

  const request = await fetch(`http://192.168.1.106:3000/users/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
    },
		body: JSON.stringify({
      ...req.body
		}),
  });  
  
  response = await normalizeResponse(request)

  res.status(request.status).json(response);
}