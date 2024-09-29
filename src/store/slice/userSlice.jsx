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
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = null;
      state.message = "login successful";
    },
    loginError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "An unexpected error occurred"; // Fallback error message
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

    getUserRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
      state.message = action.payload;
    },
    getUserError: (state, action) => {
      state.user = {};
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetPasswordRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    },

    sendMailSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.message = action.payload;
    },
    sendMailError: (state, action) => {
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

    clearUser: (state) => {
      state.user = {};
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const getUser = (token) => {
  return async (dispatch) => {
    dispatch(userSlice.actions.getUserRequest());
    try {
      const { data } = await axios.get(`${API_URL}/auth/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(userSlice.actions.getUserSuccess(data.data));
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      dispatch(userSlice.actions.getUserError(errorMessage));
    }
  };
};

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
  localStorage.removeItem("token");
  dispatch(userSlice.actions.loginRequest());

  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch(userSlice.actions.loginSuccess(data.data));
    localStorage.setItem("token", data.data.token);
  } catch (e) {
    console.error("Login error:", e); // Log error for debugging
    const errorMessage =
      e.response?.data?.message || "Login failed. Please try again.";
    dispatch(userSlice.actions.loginError(errorMessage));
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

// reset password
export const resetPassword = (formData, token) => async (dispatch) => {
  dispatch(userSlice.actions.resetPasswordRequest());

  try {
    const { res } = await axios.post(
      `${API_URL}/auth/reset-password?token=${token}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(userSlice.actions.resetPasswordSuccess(res.data));
  } catch (e) {
    dispatch(userSlice.actions.resetPasswordError(e.response?.data?.message));
  }
};

export const SendEmail = (email) => async (dispatch) => {
  try {
    const { res } = await axios.post(
      `${API_URL}/auth/verify-account?email=${email}`
    );

    dispatch(userSlice.actions.sendMailSuccess(res.data));
  } catch (e) {
    dispatch(
      userSlice.actions.sendMailError(
        e?.response?.data?.message || "Sending email failed. Please try again."
      )
    );
  }
};

export const clearUserInfor = () => async (dispatch) => {
  dispatch(clearUser());
};

export const { clearAllError, setIsAuthenticated, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
