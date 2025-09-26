import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService, endpoints } from '../../services/api';

// Async thunks for CRUD operations
export const fetchDeliveryZones = createAsyncThunk(
  'deliveryZones/fetchDeliveryZones',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.deliveryZones, params);
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
};

// Delivery zones slice
const deliveryZonesSlice = createSlice({
  name: 'deliveryZones',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch delivery zones
      .addCase(fetchDeliveryZones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryZones.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDeliveryZones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const { 
  clearError 
} = deliveryZonesSlice.actions;

// Selectors
export const selectDeliveryZones = (state) => state.deliveryZones.items;
export const selectDeliveryZonesLoading = (state) => state.deliveryZones.loading;
export const selectDeliveryZonesError = (state) => state.deliveryZones.error;

export default deliveryZonesSlice.reducer;
