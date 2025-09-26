import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Plus, 
  Star,
  MapPin,
  Phone,
  Mail,
  Check,
  X,
  Eye
} from 'lucide-react';
import { fetchVendors, selectVendors, selectVendorsLoading, selectVendorsError } from '../store/slices/vendorsSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const VendorManagement = () => {
  const dispatch = useDispatch();
  const vendors = useSelector(selectVendors);
  const loading = useSelector(selectVendorsLoading);
  const error = useSelector(selectVendorsError);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    const baseClasses = "px-2.5 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'active';
      case 'inactive':
        return 'inactive';
      case 'pending':
        return 'pending';
      default:
        return status;
    }
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ComplianceItem = ({ label, isCompliant }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-900">{label}</span>
      <div className="w-4 h-4 rounded-full flex items-center justify-center">
        {isCompliant ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <X className="w-4 h-4 text-red-600" />
        )}
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center p-10"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center p-10"><ErrorMessage error={error} /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Vendor Management</h1>
          <p className="text-gray-600 text-sm lg:text-base">Onboard and oversee vendors across categories</p>
        </div>

        {/* Search and Actions */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
                <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div>
              <button className="inline-flex items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                <Plus className="w-4 h-4 mr-2" />
                Add Vendor
              </button>
            </div>
          </div>
        </div>

        {/* Vendor Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Vendor Header */}
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    {/* Store Icon */}
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-gray-400 rounded opacity-60"></div>
                    </div>
                    
                    {/* Vendor Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{vendor.name}</h3>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">{vendor.category}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{vendor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={getStatusBadge(vendor.status)}>
                    {getStatusText(vendor.status)}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-600">{vendor.description}</p>
              </div>

              {/* Statistics */}
              <div className="bg-gray-50 border-b border-gray-200 p-5">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Products</p>
                    <p className="text-lg font-medium text-gray-900">{vendor.products}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Orders</p>
                    <p className="text-lg font-medium text-gray-900">{vendor.orders}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Since</p>
                    <p className="text-lg font-medium text-gray-900">{vendor.since}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-5 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{vendor.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{vendor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{vendor.email}</span>
                  </div>
                </div>
              </div>

              {/* Compliance Checklist */}
              <div className="p-5 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Compliance Checklist</h4>
                <div className="space-y-2">
                  <ComplianceItem 
                    label="Hygiene Certification" 
                    isCompliant={vendor.compliance.hygieneCertification} 
                  />
                  <ComplianceItem 
                    label="Delivery Readiness" 
                    isCompliant={vendor.compliance.deliveryReadiness} 
                  />
                  <ComplianceItem 
                    label="Tax Documents" 
                    isCompliant={vendor.compliance.taxDocuments} 
                  />
                  <ComplianceItem 
                    label="Quality Check" 
                    isCompliant={vendor.compliance.qualityCheck} 
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 border-t border-gray-200 flex justify-between">
                <button className="text-sm font-medium text-green-600 hover:text-green-700">
                  Manage Inventory
                </button>
                <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                  <Eye className="w-4 h-4 mr-1" />
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or add a new vendor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorManagement;
