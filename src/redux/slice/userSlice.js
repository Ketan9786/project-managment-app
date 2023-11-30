import { createSlice } from "@reduxjs/toolkit";


const verifyToken = async (token) => {
  //need to work verfy part of token

  return true; 
};

const userSlice = createSlice({
  name: 'userLogin',
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    loginUser: async (state, action) => {
     
      const isValidToken = await verifyToken(action.payload);

      if (isValidToken) {
        state.isLoggedIn = true;
        state.token = action.payload;
      } else {
        
        console.error('Invalid token');
      }
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
