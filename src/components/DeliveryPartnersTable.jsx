import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  ListFilter as Filter, 
  RotateCcw, 
  Plus, 
  Download, 
  Edit, 
  Trash2,
  Check,
  MoreHorizontal
} from 'lucide-react';
import {
  fetchDeliveryPartners,
  createDeliveryPartner,
  updateDeliveryPartner,
  deleteDeliveryPartner,
  setSearchTerm,
  setFilters,
  clearFilters,
  clearError,
  selectFilteredDeliveryPartners,
  selectDeliveryPartnersLoading,
  selectDeliveryPartnersError,
  selectDeliveryPartnersSearchTerm
} from '../store/slices/deliveryPartnersSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const DeliveryPartnersTable = () => {
  const dispatch = useDispatch();
  const partners = useSelector(selectFilteredDeliveryPartners);
  const loading = useSelector(selectDeliveryPartnersLoading);
  const error = useSelector(selectDeliveryPartnersError);
  const searchTerm = useSelector(selectDeliveryPartnersSearchTerm);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    region: '',
    status: 'active',
    deliveries: 0,
    rating: 0,
    vehicle: 'Car',
    completion: 0
  });

  useEffect(() => {
    dispatch(fetchDeliveryPartners());
  }, [dispatch]);

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
  };

  const handleFilter = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPartner) {
        await dispatch(updateDeliveryPartner({ id: editingPartner.id, partnerData: formData })).unwrap();
      } else {
        await dispatch(createDeliveryPartner(formData)).unwrap();
      }
      setShowAddModal(false);
      setEditingPartner(null);
      setFormData({
        name: '',
        email: '',
        region: '',
        status: 'active',
        deliveries: 0,
        rating: 0,
        vehicle: 'Car',
        completion: 0
      });
    } catch (error) {
      console.error('Failed to save partner:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        await dispatch(deleteDeliveryPartner(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete partner:', error);
      }
    }
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setFormData(partner);
    setShowAddModal(true);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2.5 py-1 rounded-full text-xs font-medium capitalize";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
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
                placeholder="Search delivery partners..."
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
                <option value="pending">Pending</option>
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
              Add Partner
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
          <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deliveries</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{partner.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(partner.status)}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.deliveries}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.rating > 0 ? partner.rating.toFixed(1) : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {partner.status === 'pending' ? (
                          <button className="p-1 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50"><Check className="w-4 h-4" /></button>
                        ) : (
                          <button onClick={() => handleEdit(partner)} className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Edit className="w-4 h-4" /></button>
                        )}
                        <button onClick={() => handleDelete(partner.id)} className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><MoreHorizontal className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {partners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="font-medium text-gray-900">{partner.name}</p>
                            <p className="text-sm text-gray-500">{partner.email}</p>
                        </div>
                        <span className={getStatusBadge(partner.status)}>
                            {partner.status}
                        </span>
                    </div>
                    <div className="text-sm text-gray-700 mb-3">
                        Region: <span className="font-medium text-gray-900">{partner.region}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-center border-t border-b py-3 my-3">
                        <div>
                            <p className="text-gray-500">Deliveries</p>
                            <p className="font-medium text-gray-900">{partner.deliveries}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Rating</p>
                            <p className="font-medium text-gray-900">{partner.rating > 0 ? partner.rating.toFixed(1) : 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex justify-end items-center">
                        <div className="flex items-center space-x-2">
                            {partner.status === 'pending' ? (
                              <button className="p-1 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50"><Check className="w-4 h-4" /></button>
                            ) : (
                              <button onClick={() => handleEdit(partner)} className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Edit className="w-4 h-4" /></button>
                            )}
                            <button onClick={() => handleDelete(partner.id)} className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            ))}
          </div>

          {partners.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">No delivery partners found</div>
            </div>
          )}

          <div className="bg-white lg:bg-transparent rounded-b-lg border-t border-gray-200 px-6 py-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{partners.length}</span> delivery partners
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">Previous</button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-md">1</button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">Next</button>
              </div>
            </div>
          </div>
        </>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingPartner ? 'Edit Partner' : 'Add New Partner'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50">
                  {loading ? 'Saving...' : (editingPartner ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPartnersTable;