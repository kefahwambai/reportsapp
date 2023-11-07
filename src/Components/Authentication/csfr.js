const csrfFetch = async (url, options) => {
  
  const jwtToken = localStorage.getItem('jwtToken');

  
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwtToken}`,
  };

  
  const response = await fetch(url, { ...options, headers });

  if (response.status >= 400) throw response;
  
  return response;
};

export default csrfFetch;