import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProject = createAsyncThunk('fetchProject', async () => {
    const response = await fetch("http://localhost:3001/projects")
    return response.json();
})
const projectSlice = createSlice({
    name: 'projectData',
    initialState: {
        isLoading: true,
        data: null,
        isError: false,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchProject.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProject.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;

        })
        builder.addCase(fetchProject.rejected, (state, action) => {
            console.log('error', action.payload);
            state.isError = true;

        })
    }

})

export default projectSlice.reducer;