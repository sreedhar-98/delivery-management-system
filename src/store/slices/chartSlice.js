import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService, endpoints } from '../../services/api';

export const fetchChartData = createAsyncThunk(
  'chart/fetchChartData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.platformPerformance);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: {
    categories: [],
    series: [],
  },
  loading: false,
  error: null,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};

        state.data = {
          categories: Array.isArray(payload.categories) ? payload.categories : [],
          series: Array.isArray(payload.series) ? payload.series : [],
        };
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectChartData = (state) => state.chart.data;
export const selectChartLoading = (state) => state.chart.loading;
export const selectChartError = (state) => state.chart.error;

export default chartSlice.reducer;
