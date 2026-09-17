// src/redux/slices/adminResellerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all resellers (this can be connected to your backend)
export const fetchResellers = createAsyncThunk('adminResellers/fetchResellers', async () => {
  try {
    const response = await axios.get('/api/resellers'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch resellers');
  }
});

const adminResellerSlice = createSlice({
  name: 'adminResellers',
  initialState: {
    resellers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResellers.fulfilled, (state, action) => {
        state.loading = false;
        state.resellers = action.payload;
      })
      .addCase(fetchResellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminResellerSlice.reducer;
