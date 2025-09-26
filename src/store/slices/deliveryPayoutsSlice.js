import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService, endpoints } from '../../services/api';

export const fetchDeliveryPayouts = createAsyncThunk(
  'deliveryPayouts/fetchDeliveryPayouts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.deliveryPayouts);
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

const deliveryPayoutsSlice = createSlice({
  name: 'deliveryPayouts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryPayouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryPayouts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDeliveryPayouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectDeliveryPayouts = (state) => state.deliveryPayouts.items;
export const selectDeliveryPayoutsLoading = (state) => state.deliveryPayouts.loading;
export const selectDeliveryPayoutsError = (state) => state.deliveryPayouts.error;

export default deliveryPayoutsSlice.reducer;
