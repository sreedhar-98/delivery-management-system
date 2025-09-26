import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  ListFilter as Filter, 
  RotateCcw, 
  Plus, 
  Download, 
  Edit, 
  Trash2
} from 'lucide-react';
import {
  fetchVendors,
  createVendor,
  updateVendor,
  deleteVendor,
  setSearchTerm,
  setFilters,
  clearFilters,
  selectVendorsSearchTerm,
  selectFilteredVendors,
  selectVendorsLoading,
  selectVendorsError,
  clearError
} from '../store/slices/vendorsSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const VendorsTable = () => {
  const dispatch = useDispatch();
  const vendors = useSelector(selectFilteredVendors);
  const loading = useSelector(selectVendorsLoading);
  const error = useSelector(selectVendorsError);
  const searchTerm = useSelector(selectVendorsSearchTerm);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    region: '',
    status: 'active',
    products: 0,
    orders: 0,
    category: 'Groceries'
  });

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
  };

  const handleFilter = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVendor) {
        await dispatch(updateVendor({ id: editingVendor.id, vendorData: formData })).unwrap();
      } else {
        await dispatch(createVendor(formData)).unwrap();
      }
      setShowAddModal(false);
      setEditingVendor(null);
      setFormData({
        name: '',
        email: '',
        region: '',
        status: 'active',
        products: 0,
        orders: 0,
        category: 'Groceries'
      });
    } catch (error) {
      console.error('Failed to save vendor:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await dispatch(deleteVendor(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete vendor:', error);
      }
    }
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setFormData(vendor);
    setShowAddModal(true);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2.5 py-1 rounded-full text-xs font-medium capitalize";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div>
      {error && (
        <ErrorMessage 
          error={error} 
          onDismiss={() => dispatch(clearError())}
          className="mb-6"
        />
      )}

      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                onChange={(e) => handleFilter('status', e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button 
                onClick={handleClearFilters}
                className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Vendor
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" />
        </div>
      )}

      {!loading && (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(vendor.status)}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.products}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleEdit(vendor)} className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(vendor.id)} className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {vendors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">No vendors found</div>
            </div>
          )}
        </>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} placeholder="Region" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50">
                  {loading ? 'Saving...' : (editingVendor ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorsTable;