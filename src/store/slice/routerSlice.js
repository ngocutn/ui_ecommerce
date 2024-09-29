import { createSlice } from "@reduxjs/toolkit";

const routerSlice = createSlice({
  name: "router",
  initialState: {
    currentPath: "/",
  },
  reducers: {
    setCurrentPath(state, action) {
      state.currentPath = action.payload;
    },
  },
});

export const { setCurrentPath } = routerSlice.actions;

export default routerSlice.reducer;
