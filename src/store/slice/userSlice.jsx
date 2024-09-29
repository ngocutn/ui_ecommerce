import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";
import { accordionActionsClasses } from "@mui/material";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: null,
    message: null,
    user: {},
    token: null,
    isConfirm: false,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = true;
      state.isAuthenticated = true;
      state.error = null;
      state.message = "login successful";
    },
    loginError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
      state.isAuthenticated = false;
      state.user = {};
    },

    logoutSuccess: (state, action) => {
      state.user = {};
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = null;
    },
    logoutError: (state, action) => {
      state.user = {};
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.message = null;
    },

    registerRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = null;
      state.isConfirm = true;
      state.message = "register successful";
    },
    registerError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
      state.isConfirm = false;
      state.isAuthenticated = false;
    },

    forgotRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    forgotSuccess: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.message = action.payload;
    },
    forgotError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    },

    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    clearAllError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const Register = (userData) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());

  try {
    const { data } = await axios.post(`${API_URL}/auth/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch(userSlice.actions.registerSuccess(data.data));
  } catch (e) {
    dispatch(userSlice.actions.registerError(e.response?.data?.message));
  }
};

export const Login = (userData) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());

  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, userData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    localStorage.setItem("token", data.data.token);

    dispatch(userSlice.actions.loginSuccess(data.data));
  } catch (e) {
    dispatch(userSlice.actions.loginError(e.response?.data?.message));
  }
};

export const Logout = () => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/logout`);

    dispatch(userSlice.actions.logoutSuccess());
    dispatch(checkToken());
    dispatch(userSlice.actions.clearAllError());
  } catch (e) {
    dispatch(userSlice.actions.logoutError(e.response.data.message));
  }
};

// check token
export const checkToken = () => (dispatch) => {
  const token = localStorage.getItem("token");

  if (token == undefined || !token) {
    dispatch(setIsAuthenticated(false));
  } else {
    dispatch(setIsAuthenticated(true));
  }
};

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(userSlice.actions.forgotRequest());

  try {
    const { data } = await axios.post(`${API_URL}/auth/forgot-password`, {
      email,
    });
    dispatch(userSlice.actions.forgotSuccess(data.message));
  } catch (e) {
    dispatch(userSlice.actions.forgotError(e.response?.data?.message));
  }
};

export const { clearAllError, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
