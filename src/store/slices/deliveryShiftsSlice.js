import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService, endpoints } from '../../services/api';

export const fetchDeliveryShifts = createAsyncThunk(
  'deliveryShifts/fetchDeliveryShifts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.deliveryShifts);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWeeklySchedule = createAsyncThunk(
  'deliveryShifts/fetchWeeklySchedule',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.weeklySchedule);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  shifts: [],
  weeklySchedule: [],
  loading: false,
  error: null,
};

const deliveryShiftsSlice = createSlice({
  name: 'deliveryShifts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryShifts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryShifts.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts = action.payload;
      })
      .addCase(fetchDeliveryShifts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWeeklySchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeeklySchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklySchedule = action.payload;
      })
      .addCase(fetchWeeklySchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectDeliveryShifts = (state) => state.deliveryShifts.shifts;
export const selectWeeklySchedule = (state) => state.deliveryShifts.weeklySchedule;
export const selectDeliveryShiftsLoading = (state) => state.deliveryShifts.loading;
export const selectDeliveryShiftsError = (state) => state.deliveryShifts.error;

export default deliveryShiftsSlice.reducer;
