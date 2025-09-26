import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';

// ----------- THUNKS -----------

// Fetch all vendors
export const fetchVendors = createAsyncThunk('vendors/fetchVendors', async () => {
  const response = await apiService.get('/vendors');
  return response;
});

// Create vendor
export const createVendor = createAsyncThunk('vendors/createVendor', async (vendorData) => {
  const response = await apiService.post('/vendors', vendorData);
  return response;
});

// Update vendor
export const updateVendor = createAsyncThunk('vendors/updateVendor', async ({ id, vendorData }) => {
  const response = await apiService.put(`/vendors/${id}`, vendorData);
  return response;
});

// Delete vendor
export const deleteVendor = createAsyncThunk('vendors/deleteVendor', async (id) => {
  await apiService.delete(`/vendors/${id}`);
  return id;
});

// ----------- SLICE -----------

const vendorsSlice = createSlice({
  name: 'vendors',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchTerm: '',
    filters: {},
  },
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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create
      .addCase(createVendor.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update
      .addCase(updateVendor.fulfilled, (state, action) => {
        const index = state.items.findIndex((v) => v.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.items = state.items.filter((v) => v.id !== action.payload);
      });
  },
});

// ----------- EXPORTS -----------

export const { setSearchTerm, setFilters, clearFilters, clearError } = vendorsSlice.actions;

export const selectVendors = (state) => state.vendors.items;
export const selectVendorsLoading = (state) => state.vendors.loading;
export const selectVendorsError = (state) => state.vendors.error;
export const selectVendorsSearchTerm = (state) => state.vendors.searchTerm;
export const selectVendorsFilters = (state) => state.vendors.filters;

export const selectFilteredVendors = (state) => {
  const vendors = selectVendors(state);
  const searchTerm = selectVendorsSearchTerm(state);
  const filters = selectVendorsFilters(state);

  let filteredVendors = vendors;

  if (searchTerm) {
    filteredVendors = filteredVendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filters.status) {
    filteredVendors = filteredVendors.filter((vendor) => vendor.status === filters.status);
  }

  return filteredVendors;
};

export default vendorsSlice.reducer;
