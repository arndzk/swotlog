import { API_URL } from 'constants/misc';

export const doFetch = ({
  internalRoute,
  token,
  route,
  data,
  uid,
}) => (typeof window !== 'undefined' 
  ? window.fetch 
  : require('node-fetch'))
    (`${API_URL}${internalRoute ? internalRoute : ''}`, {
      method: 'POST',
      body: JSON.stringify({ 
        ...data,
        route,
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...(typeof window === 'undefined' && token, {
          cookie: `token=${token};${uid ? ` uid=${uid}` : ''}`
        })
      },
    }).then(response => {
      if (response.status === 401)
        throw "Authentication error"
    
      if (response.status === 404 || response.status === 500)
        throw "Service temporarily unvailable";
      
      return response.json();
  });