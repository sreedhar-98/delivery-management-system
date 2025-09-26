import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService, endpoints } from '../../services/api';

// Async thunks for CRUD operations
export const fetchVendors = createAsyncThunk(
  'vendors/fetchVendors',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await apiService.get(endpoints.vendors, params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createVendor = createAsyncThunk(
  'vendors/createVendor',
  async (vendorData, { rejectWithValue }) => {
    try {
      const data = await apiService.post(endpoints.vendors, vendorData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVendor = createAsyncThunk(
  'vendors/updateVendor',
  async ({ id, vendorData }, { rejectWithValue }) => {
    try {
      const data = await apiService.put(`${endpoints.vendors}/${id}`, vendorData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteVendor = createAsyncThunk(
  'vendors/deleteVendor',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.delete(`${endpoints.vendors}/${id}`);
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

// Vendors slice
const vendorsSlice = createSlice({
  name: 'vendors',
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
      // Fetch vendors
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.pagination.total = action.payload.length;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create vendor
      .addCase(createVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update vendor
      .addCase(updateVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete vendor
      .addCase(deleteVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteVendor.rejected, (state, action) => {
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
} = vendorsSlice.actions;

// Selectors
export const selectVendors = (state) => state.vendors.items;
export const selectVendorsLoading = (state) => state.vendors.loading;
export const selectVendorsError = (state) => state.vendors.error;
export const selectVendorsSearchTerm = (state) => state.vendors.searchTerm;
export const selectVendorsFilters = (state) => state.vendors.filters;
export const selectVendorsPagination = (state) => state.vendors.pagination;

// Filtered vendors selector
export const selectFilteredVendors = (state) => {
  const vendors = selectVendors(state);
  const searchTerm = selectVendorsSearchTerm(state);
  const filters = selectVendorsFilters(state);

  let filteredVendors = vendors;

  // Apply search filter
  if (searchTerm) {
    filteredVendors = filteredVendors.filter(vendor =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply status filter
  if (filters.status) {
    filteredVendors = filteredVendors.filter(vendor => vendor.status === filters.status);
  }

  // Apply category filter
  if (filters.category) {
    filteredVendors = filteredVendors.filter(vendor => vendor.category === filters.category);
  }

  return filteredVendors;
};

export default vendorsSlice.reducer;