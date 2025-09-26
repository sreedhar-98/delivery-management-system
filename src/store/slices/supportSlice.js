import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService, endpoints } from '../../services/api';

export const fetchSupportTickets = createAsyncThunk(
  'support/fetchSupportTickets',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.supportTickets);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSupportSummary = createAsyncThunk(
  'support/fetchSupportSummary',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.supportSummary);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchIssueTypes = createAsyncThunk(
  'support/fetchIssueTypes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.issueTypes);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tickets: [],
  summary: [],
  issueTypes: [],
  loading: false,
  error: null,
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addcase(fetchSupportTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSupportSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchSupportSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchIssueTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssueTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.issueTypes = action.payload;
      })
      .addCase(fetchIssueTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectSupportTickets = (state) => state.support.tickets;
export const selectSupportSummary = (state) => state.support.summary;
export const selectIssueTypes = (state) => state.support.issueTypes;
export const selectSupportLoading = (state) => state.support.loading;
export const selectSupportError = (state) => state.support.error;

export default supportSlice.reducer;
