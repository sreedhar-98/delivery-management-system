import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService, endpoints } from '../../services/api';

// Async thunks for stats
export const fetchStats = createAsyncThunk(
  'stats/fetchStats',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.stats, params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
  lastUpdated: null
};

// Stats slice
const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch stats
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const { clearError } = statsSlice.actions;

// Selectors
export const selectStats = (state) => state.stats.items;
export const selectStatsLoading = (state) => state.stats.loading;
export const selectStatsError = (state) => state.stats.error;
export const selectStatsLastUpdated = (state) => state.stats.lastUpdated;

export default statsSlice.reducer;