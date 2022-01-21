import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUser: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    follow: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        followings: [...state.currentUser.followings, action.payload],
      };
    },
    unfollow: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        followings: state.currentUser.followings.filter(
          (following) => following !== action.payload
        ),
      };
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, updateUser, follow, unfollow, logout } = userSlice.actions;
export default userSlice.reducer;