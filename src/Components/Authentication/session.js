import csrfFetch from "../Authentication/csfr";

const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});

const storeCSRFToken = (res) => {
  const csrfToken = res.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

const storeCurrentUser = (user) => {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
};

export const login = (user) => async (dispatch) => {
  try {
    const { email, password } = user;
    const res = await csrfFetch("https://ireporter-vndn.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data)
      storeCurrentUser(data);
      dispatch(setCurrentUser(data));
      return data; 
    } else {
      const errorData = await res.json(); 
      console.error('Login failed:', res.status, res.statusText, errorData);      
      throw new Error(`Login failed: ${errorData.message}`); 
    }
  } catch (error) {
    console.error('Login error:', error);    
    throw error; 
  }
};


export const logout = () => async (dispatch) => {
    const res = await csrfFetch("https://ireporter-vndn.onrender.com/logout", {
      method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return res;
};

export const signup = (user) => async (dispatch) => {
  const { name, email, password, passwordConfirmation, id_number  } = user;
  const res = await csrfFetch("https://ireporter-vndn.onrender.com/signup", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      passwordConfirmation,
      id_number      
    })
  });
  console.log("Response status:", res.status);
  const text = await res.text();
  // console.log("Response text:", text);
  const data = await res.json();
  // console.log("Response JSON data:", data); 
  return res;
};

export const adminSignup = (user) => async (dispatch) => {
  const { name, email, password, passwordConfirmation, id_number, admin } = user;
  const res = await csrfFetch("https://ireporter-vndn.onrender.com/signup", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      passwordConfirmation,
      id_number,
      admin,
      
    })
  });
  console.log("Response status:", res.status);
  const text = await res.text();
  // console.log("Response text:", text);
  const data = await res.json();
  // console.log("Response JSON data:", data); 
  return res;
};

export const ForgotPassword = (user) => async (dispatch) => {
  const { email } = user;

  try {    
    const res = await csrfFetch("https://ireporter-vndn.onrender.com/password_resets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfFetch,
      },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {     
      throw new Error("Password reset request failed");
    }   
    const data = await res.json();
    
  } catch (error) {
    console.error("Password reset error:", error);
  }
};


export const restoreSession = () => async (dispatch) => {
    const res = await csrfFetch("https://ireporter-vndn.onrender.com/session");
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.name);
    dispatch(setCurrentUser(data.name));
    return res;
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



