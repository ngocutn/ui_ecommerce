import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: null,
    message: null,
    user: {},
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
      state.isLoading = false;
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
      state.message = "logout successful";
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
      state.message = "register successful";
    },
    registerError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
      state.isAuthenticated = false;
    },

    clearAllError: (state) => {
      state.isLoading = false;
      state.error = null;
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
    dispatch(userSlice.actions.clearAllError());
  } catch (e) {
    dispatch(userSlice.actions.registerError(e.response?.data?.message));
  }
};

export const Login = (userData) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());

  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    localStorage.setItem("token", data.data.token);

    dispatch(userSlice.actions.loginSuccess(data.data));
    dispatch(userSlice.actions.clearAllError());
  } catch (e) {
    dispatch(userSlice.actions.loginError(e.response?.data?.message));
  }
};

export const Logout = () => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/logout`);

    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllError());
  } catch (e) {
    dispatch(userSlice.actions.logoutError(e.response.data.message));
  }
};

export default userSlice.reducer;
