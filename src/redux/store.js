import { configureStore } from "@reduxjs/toolkit";

import roomReducer from "./slices/roomSlice";
import bookingReducer from "./slices/bookingSlice";
import customerReducer from "./slices/customerSlice";
import staffReducer from "./slices/staffSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    roomReducer,
    bookingReducer,
    customerReducer,
    staffReducer,
    authReducer,
  },
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    const { users, currentUser } =
      store.getState().authReducer;

    window.localStorage.setItem(
      "hotelUsers",
      JSON.stringify(users)
    );

    window.localStorage.setItem(
      "hotelCurrentUser",
      JSON.stringify(currentUser)
    );
  });
}

export default store;
