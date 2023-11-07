export const getStoredAuthToken = () => {
    return localStorage.getItem('jwtToken');
};
  
  
export const setStoredAuthToken = (token) => {
    localStorage.setItem("authToken", token);
};
  