export const getStoredAuthToken = () => {
  return window.sessionStorage.getItem('jwt');
};

export const setStoredAuthToken = (token) => {
  window.sessionStorage.setItem('jwt', token);
};
