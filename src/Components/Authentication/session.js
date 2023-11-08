import csrfFetch from "../Authentication/csfr";
import { getStoredAuthToken, setStoredAuthToken } from './authUtils';
import { useNavigate, Link } from 'react-router-dom';


const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});


export const login = (user) => async (dispatch) => {  
    const requestData = {
      user: {
        email: user.email,
        password: user.password,
      },
    };

    const jwtToken = getStoredAuthToken(); 
    if (!jwtToken) {
      throw new Error("JWT Token not found"); 
    }

    const res = await csrfFetch('https://ireporter-th6z.onrender.com/login', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    console.log('Login response:', res);
    if (res.ok) {
      console.log("Response status:", res.status);
      return res;
    }  else {
      const errorData = await res.json();
      console.error('Login failed:', res.status, res.statusText, errorData);
      throw Error(`Login failed: ${errorData.message}`);
    }
    
};



export const logout = () => (dispatch) => {
 
  setStoredAuthToken(null);
  dispatch(removeCurrentUser());
  return Promise.resolve(); // Assuming logout is always successful
};

export const signup = (user) => async (dispatch) => {
  const requestData = {
    user: {
      name: user.name,
      email: user.email,
      password: user.password,
      passwordConfirmation: user.passwordConfirmation,
      id_number: user.id_number,      
    },
  };
  const res = await  csrfFetch('https://ireporter-th6z.onrender.com/signup', {
    method: "POST",
    body: JSON.stringify(requestData)
  });
  if (res.ok) {
    console.log("Response status:", res.status);

    return res;
  } else {
    const errorData = await res.json();
    console.error('Signup failed:', res.status, res.statusText, errorData);
    throw Error(`Signup failed: ${errorData.message}`);
  }
};

export const adminSignup = (user) => async (dispatch) => {
  const navigate = useNavigate();
  const requestData = {
    user: {
      name: user.name,
      email: user.email,
      password: user.password,
      passwordConfirmation: user.passwordConfirmation,
      id_number: user.id_number,
      admin: user.admin,
    },
  };
  const res = await  csrfFetch('https://ireporter-th6z.onrender.com/signup', {
    method: "POST",
    body: JSON.stringify(requestData)
  });
  if (res.ok) {
    console.log("Response status:", res.status);
    setTimeout(() => {
      navigate('/login'); 
    }, 123);

    return res;
  } else {
    const errorData = await res.json();
    console.error('Signup failed:', res.status, res.statusText, errorData);
    throw Error(`Signup failed: ${errorData.message}`);
  }
};

export const ForgotPassword = async (user) => {
  try {
    const requestData = {
      user: {        
        email: user.email,      
      },
    };
    const response = await  csrfFetch('https://ireporter-th6z.onrender.com/password_resets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      console.log("Response status:", response.status);
    } else {
      const errorData = await response.json();
      console.error('Signup failed:', response.status, response.statusText, errorData);
      throw Error(`Signup failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Password reset request failed:', error);
  }
};



export const restoreSession = () => async (dispatch) => {
  try {
    const res = await csrfFetch("https://ireporter-th6z.onrender.com/current_user");

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



