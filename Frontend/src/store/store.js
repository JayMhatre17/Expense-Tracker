import userSlice from "./UserSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
