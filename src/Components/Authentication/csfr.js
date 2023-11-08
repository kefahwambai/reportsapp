const csrfFetch = async (url, options) => {
  const jwtToken = localStorage.getItem('jwtToken');

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwtToken}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Handle non-JSON responses
    const errorMessage = errorData.message || 'Request failed with no error message.';
    
    throw new Error(errorMessage);
  }

  return response;
};

export default csrfFetch;
