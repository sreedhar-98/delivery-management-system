import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService, endpoints } from '../../services/api';

export const fetchQuickActions = createAsyncThunk(
  'quickActions/fetchQuickActions',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.quickActions);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const quickActionsSlice = createSlice({
  name: 'quickActions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuickActions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuickActions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchQuickActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectQuickActions = (state) => state.quickActions.items;
export const selectQuickActionsLoading = (state) => state.quickActions.loading;
export const selectQuickActionsError = (state) => state.quickActions.error;

export default quickActionsSlice.reducer;
