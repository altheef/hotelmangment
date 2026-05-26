import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_USERS = [
  {
    id: 1,
    name: "Hotel Admin",
    email: "admin@hotel.com",
    password: "admin123",
    role: "Admin",
  },
];

const readStorage = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  users: readStorage("hotelUsers", DEFAULT_USERS),
  currentUser: readStorage("hotelCurrentUser", null),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },

    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },

    logoutUser: (state) => {
      state.currentUser = null;
    },

    updateCurrentUser: (state, action) => {
      if (!state.currentUser) {
        return;
      }

      const updatedUser = {
        ...state.currentUser,
        ...action.payload,
      };

      state.currentUser = updatedUser;

      state.users = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
  updateCurrentUser,
} = authSlice.actions;

export default authSlice.reducer;
