import { configureStore } from "@reduxjs/toolkit";
import Authslice from "./Authslice";
let store = configureStore({
  reducer: { Authslice },
});
export default store;
