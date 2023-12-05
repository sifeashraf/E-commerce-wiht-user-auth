import { createSlice } from "@reduxjs/toolkit";

import Cookies from "universal-cookie";

const cookie = new Cookies();

let authslice = createSlice({
  name: "authslice",
  initialState: { token: "", user: "" },
  reducers: {
    login: (state, action) => {
      if (cookie.get("Bearer")) {
        cookie.remove("Bearer");
      }
      state.token = action.payload.token;
      state.user = action.payload.user;
      cookie.set("Bearer", action.payload.token);
    },
    logout: (state) => {
      state.token = "";
      state.user = "";
      cookie.remove("Bearer");
    },
  },
});
export let { login, logout } = authslice.actions;
export default authslice.reducer;
