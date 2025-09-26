import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  ListFilter as Filter, 
  RotateCcw, 
  Plus, 
  Star,
  Phone,
  X,
  Check,
  MoreHorizontal,
  User
} from 'lucide-react';
import { 
  fetchDeliveryPartners, 
  setSearchTerm, 
  setFilters, 
  clearFilters, 
  selectFilteredDeliveryPartners, 
  selectDeliveryPartnersLoading, 
  selectDeliveryPartnersError, 
  selectDeliveryPartnersSearchTerm 
} from '../store/slices/deliveryPartnersSlice';
import DeliveryZones from './DeliveryZones';
import DeliveryShifts from './DeliveryShifts';
import DeliveryPayouts from './DeliveryPayouts';
import DeliverySupport from './DeliverySupport';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const DeliveryPartnerManagement = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('partners');
  
  const partners = useSelector(selectFilteredDeliveryPartners);
  const loading = useSelector(selectDeliveryPartnersLoading);
  const error = useSelector(selectDeliveryPartnersError);
  const searchTerm = useSelector(selectDeliveryPartnersSearchTerm);

  useEffect(() => {
    if (activeTab === 'partners') {
      dispatch(fetchDeliveryPartners());
    }
  }, [dispatch, activeTab]);

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
  };

  const handleFilter = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return "px-2.5 py-1 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#166534]";
      case 'pending':
        return "px-2.5 py-1 rounded-full text-xs font-medium bg-[#FEF9C3] text-[#854D0E]";
      case 'inactive':
        return "px-2.5 py-1 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#1F2937]";
      default:
        return "px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800";
    }
  };

  const PartnerRow = ({ partner }) => (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50">
      <div className="col-span-3 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{partner.name}</p>
          <p className="text-xs text-gray-500">{partner.email}</p>
        </div>
      </div>
      <div className="col-span-1 text-sm text-gray-900">{partner.vehicle}</div>
      <div className="col-span-1 text-sm text-gray-900">{partner.region}</div>
      <div className="col-span-1">
        <span className={getStatusBadge(partner.status)}>
          {partner.status}
        </span>
      </div>
      <div className="col-span-1 text-sm text-gray-900 text-center">{partner.deliveries}</div>
      <div className="col-span-1 text-sm text-gray-900 flex items-center justify-center">
        {partner.rating ? (
          <>
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            {partner.rating.toFixed(1)}
          </>
        ) : (
          'N/A'
        )}
      </div>
      <div className="col-span-2 text-sm text-gray-900 text-center">{partner.completion}%</div>
      <div className="col-span-2 flex items-center justify-center space-x-2">
        {partner.status === 'active' && (
          <button className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50">
            <Phone className="w-4 h-4" />
          </button>
        )}
        {(partner.status === 'pending' || partner.status === 'inactive') && (
          <button className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50">
            <Check className="w-4 h-4" />
          </button>
        )}
        <button className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50">
          <X className="w-4 h-4" />
        </button>
        <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const PartnerCard = ({ partner }) => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{partner.name}</p>
            <p className="text-xs text-gray-500">{partner.email}</p>
          </div>
        </div>
        <span className={getStatusBadge(partner.status)}>{partner.status}</span>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center text-sm mb-3">
        <div>
          <p className="text-xs text-gray-500">Deliveries</p>
          <p className="font-medium">{partner.deliveries}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Rating</p>
          <p className="font-medium flex items-center justify-center">
            {partner.rating ? (
              <>
                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                {partner.rating.toFixed(1)}
              </>
            ) : (
              'N/A'
            )}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Completion</p>
          <p className="font-medium">{partner.completion}%</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-3 mt-3">
        <span>{partner.vehicle} • {partner.region}</span>
        <div className="flex items-center justify-end space-x-2">
           {partner.status === 'active' && (
            <button className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50">
              <Phone className="w-4 h-4" />
            </button>
          )}
          {(partner.status === 'pending' || partner.status === 'inactive') && (
            <button className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50">
              <Check className="w-4 h-4" />
            </button>
          )}
          <button className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50">
            <X className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'partners':
        if (loading) return <div className="text-center p-10"><LoadingSpinner /></div>;
        if (error) return <div className="text-center p-10"><ErrorMessage error={error} /></div>;
        return (
          <>
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search partners..."
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
                      <option value="inactive">Inactive</option>
                    </select>
                    <button onClick={handleClearFilters} className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </button>
                  </div>
                </div>
                <div>
                  <button className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Partner
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-3">Partner</div>
                  <div className="col-span-1">Vehicle</div>
                  <div className="col-span-1">Region</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1 text-center">Deliveries</div>
                  <div className="col-span-1 text-center">Rating</div>
                  <div className="col-span-2 text-center">Completion</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {partners.map(partner => <PartnerRow key={partner.id} partner={partner} />)}
              </div>
            </div>

            <div className="lg:hidden bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {partners.map(partner => <PartnerCard key={partner.id} partner={partner} />)}
              </div>
            </div>
            
            <div className="bg-white lg:bg-transparent border-t lg:border-t-0 border-gray-200 px-6 py-4 mt-6 lg:mt-4 rounded-b-lg lg:rounded-none">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{partners.length}</span> partners
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">Previous</button>
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-md">1</button>
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">Next</button>
                </div>
              </div>
            </div>
          </>
        );
      case 'zones':
        return <DeliveryZones />;
      case 'shifts':
        return <DeliveryShifts />;
      case 'payouts':
        return <DeliveryPayouts />;
      case 'support':
        return <DeliverySupport />;
      default:
        return (
          <div className="text-center p-10 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700">Content Not Available</h3>
            <p className="text-gray-500 mt-2">The '{activeTab}' section is currently under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Delivery Partner Management</h1>
          <p className="text-gray-600 text-sm lg:text-base">Manage delivery personnel and logistics</p>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 -mb-px">
              {['Partners', 'Zones', 'Shifts', 'Payouts', 'Support'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.toLowerCase()
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {renderContent()}

      </div>
    </div>
  );
};

export default DeliveryPartnerManagement;