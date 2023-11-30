import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    const response = await fetch("http://localhost:3001/users")
    return response.json();
})
const userSlice = createSlice({
    name: 'userData',
    initialState: {
        isLoading: true,
        data: null,
        isError: false,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;

        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            console.log('error', action.payload);
            state.isError = true;

        })
    }

})

export default userSlice.reducer;