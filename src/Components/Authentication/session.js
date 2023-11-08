import csrfFetch from "../Authentication/csfr";
import { getStoredAuthToken, setStoredAuthToken } from './authUtils';
import { useNavigate } from 'react-router-dom';


const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});



export const restoreSession = () => async (dispatch) => {
  try {
    const res = await csrfFetch("http://localhost:3000/current_user");

    if (res.ok) {
      const { token, user } = await res.json();
      
      setStoredAuthToken(token);      
      dispatch(setCurrentUser(user));
      return user;
    } else {
      const errorData = await res.json();
      console.error('Session failed:', res.status, res.statusText, errorData);
      
      setStoredAuthToken(null);
      dispatch(removeCurrentUser());
      return null;
    }
    
  } catch (error) {
    console.error('Session restore error:', error);
    
  }
};


const initialState = { 
  user: JSON.parse(localStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case SET_CURRENT_USER:
      newState.user = action.user; 
      return newState;
    case REMOVE_CURRENT_USER:
      localStorage.removeItem("currentUser");
      return { ...state, user: null };
    default:
      return state;  }
  
};

export default sessionReducer;



