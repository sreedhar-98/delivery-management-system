import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService, endpoints } from '../../services/api';

// Async thunks for CRUD operations
export const fetchDeliveryPartners = createAsyncThunk(
  'deliveryPartners/fetchDeliveryPartners',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.deliveryPartners, params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createDeliveryPartner = createAsyncThunk(
  'deliveryPartners/createDeliveryPartner',
  async (partnerData, { rejectWithValue }) => {
    try {
      const data = await apiService.post(endpoints.deliveryPartners, partnerData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDeliveryPartner = createAsyncThunk(
  'deliveryPartners/updateDeliveryPartner',
  async ({ id, partnerData }, { rejectWithValue }) => {
    try {
      const data = await apiService.put(`${endpoints.deliveryPartners}/${id}`, partnerData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDeliveryPartner = createAsyncThunk(
  'deliveryPartners/deleteDeliveryPartner',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.delete(`${endpoints.deliveryPartners}/${id}`);
      return id;
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
  searchTerm: '',
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  }
};

// Delivery partners slice
const deliveryPartnersSlice = createSlice({
  name: 'deliveryPartners',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
      state.searchTerm = '';
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch delivery partners
      .addCase(fetchDeliveryPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.pagination.total = action.payload.length;
      })
      .addCase(fetchDeliveryPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create delivery partner
      .addCase(createDeliveryPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeliveryPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createDeliveryPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update delivery partner
      .addCase(updateDeliveryPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeliveryPartner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateDeliveryPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete delivery partner
      .addCase(deleteDeliveryPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeliveryPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteDeliveryPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const { 
  setSearchTerm, 
  setFilters, 
  clearFilters, 
  setPagination, 
  clearError 
} = deliveryPartnersSlice.actions;

// Selectors
export const selectDeliveryPartners = (state) => state.deliveryPartners.items;
export const selectDeliveryPartnersLoading = (state) => state.deliveryPartners.loading;
export const selectDeliveryPartnersError = (state) => state.deliveryPartners.error;
export const selectDeliveryPartnersSearchTerm = (state) => state.deliveryPartners.searchTerm;
export const selectDeliveryPartnersFilters = (state) => state.deliveryPartners.filters;
export const selectDeliveryPartnersPagination = (state) => state.deliveryPartners.pagination;

// Filtered delivery partners selector
export const selectFilteredDeliveryPartners = (state) => {
  const partners = selectDeliveryPartners(state);
  const searchTerm = selectDeliveryPartnersSearchTerm(state);
  const filters = selectDeliveryPartnersFilters(state);

  let filteredPartners = partners;

  // Apply search filter
  if (searchTerm) {
    filteredPartners = filteredPartners.filter(partner =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply status filter
  if (filters.status) {
    filteredPartners = filteredPartners.filter(partner => partner.status === filters.status);
  }

  // Apply vehicle filter
  if (filters.vehicle) {
    filteredPartners = filteredPartners.filter(partner => partner.vehicle === filters.vehicle);
  }

  return filteredPartners;
};

export default deliveryPartnersSlice.reducer;