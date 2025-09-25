import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  ChevronDown
} from 'lucide-react';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      region: 'New York',
      status: 'active',
      orders: 12,
      lastOrder: '2023-06-15'
    },
    {
      id: 2,
      name: 'Emily Johnson',
      email: 'emily.j@example.com',
      region: 'Los Angeles',
      status: 'active',
      orders: 8,
      lastOrder: '2023-06-10'
    },
    {
      id: 3,
      name: 'Robert Chen',
      email: 'robert.c@example.com',
      region: 'Chicago',
      status: 'inactive',
      orders: 0,
      lastOrder: 'N/A'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      region: 'Miami',
      status: 'active',
      orders: 5,
      lastOrder: '2023-05-28'
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      region: 'Seattle',
      status: 'pending',
      orders: 0,
      lastOrder: 'N/A'
    }
  ];

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

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  placeholder="Search customers..."
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

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="inline-flex items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 px-6 py-4">
              <div className="col-span-1 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-3 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-1 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-1 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-1 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50">
                <div className="col-span-1 flex items-center">
                  <span className="text-sm text-gray-900">{customer.id}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                </div>
                <div className="col-span-3 flex items-center">
                  <span className="text-sm text-gray-900">{customer.email}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-900">{customer.region}</span>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className={getStatusBadge(customer.status)}>
                    {customer.status}
                  </span>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className="text-sm text-gray-900">{customer.orders}</span>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className="text-sm text-gray-900">{customer.lastOrder}</span>
                </div>
                <div className="col-span-1 flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-white border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">5</span> of <span className="font-medium">5</span> customers
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
                  Previous
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-md">
                  1
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Table View */}
        <div className="lg:hidden bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
          <div className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                  <span className={getStatusBadge(customer.status)}>
                    {customer.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">{customer.email}</div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{customer.region}</span>
                  <span>{customer.orders} orders</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">Last order: {customer.lastOrder}</span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
