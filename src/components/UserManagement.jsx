import React, { useState } from 'react';
import EnhancedCustomersTable from './enhanced/EnhancedCustomersTable';
import VendorsTable from './VendorsTable';
import DeliveryPartnersTable from './DeliveryPartnersTable';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('delivery-partners');

  const renderContent = () => {
    switch (activeTab) {
      case 'customers':
        return <EnhancedCustomersTable />;
      case 'vendors':
        return <VendorsTable />;
      case 'delivery-partners':
        return <DeliveryPartnersTable />;
      default:
        return <DeliveryPartnersTable />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600 text-sm lg:text-base">Manage customers, vendors, and delivery partners</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('customers')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'customers'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Customers
              </button>
              <button
                onClick={() => setActiveTab('vendors')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'vendors'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vendors
              </button>
              <button
                onClick={() => setActiveTab('delivery-partners')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'delivery-partners'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Delivery Partners
              </button>
            </nav>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default UserManagement;
