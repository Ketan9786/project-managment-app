import { createSlice } from "@reduxjs/toolkit";

const verifyToken =  (token=false) => {
 return token;
};

export const loginUser = (token) => async (dispatch) => {
  try {
    const isValidToken =  verifyToken(token);

    if (isValidToken) {
      dispatch(userSlice.actions.loginUserSuccess(token));
    } else {
      dispatch(userSlice.actions.loginUserFailure('Invalid token'));
    }
  } catch (error) {
    console.error('Error during login:', error);
    dispatch(userSlice.actions.loginUserFailure('Login failed'));
    dispatch(userSlice.actions.logoutUser('Login failed'));
  }
};


const userSlice = createSlice({
  name: 'userLogin',
  initialState: {
    isLoggedIn: false,
    token: null,
    error: null,
  },
  reducers: {
    loginUserSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      state.error = null;
    },
    loginUserFailure: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.error = null;
    },
  },
});

export const { loginUserSuccess, loginUserFailure, logoutUser } = userSlice.actions;
export default userSlice.reducer;
