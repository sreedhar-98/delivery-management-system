import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  RefreshCw, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: 'ORD-1234',
      customer: 'John Smith',
      category: 'Groceries',
      vendor: 'Fresh Groceries',
      status: 'delivered',
      date: 'Jun 15, 2023, 2:30 PM',
      total: '$45.99'
    },
    {
      id: 'ORD-1235',
      customer: 'Emily Johnson',
      category: 'Meat',
      vendor: 'Meat Market',
      status: 'in-transit',
      date: 'Jun 15, 2023, 3:15 PM',
      total: '$32.50'
    },
    {
      id: 'ORD-1236',
      customer: 'Sarah Williams',
      category: 'Takeaway',
      vendor: 'Quick Bites',
      status: 'processing',
      date: 'Jun 15, 2023, 4:00 PM',
      total: '$18.75'
    },
    {
      id: 'ORD-1237',
      customer: 'Robert Chen',
      category: 'Groceries',
      vendor: 'Fresh Groceries',
      status: 'cancelled',
      date: 'Jun 15, 2023, 1:30 PM',
      total: '$29.99'
    },
    {
      id: 'ORD-1238',
      customer: 'Michael Brown',
      category: 'Takeaway',
      vendor: 'Quick Bites',
      status: 'processing',
      date: 'Jun 15, 2023, 4:30 PM',
      total: '$24.50'
    }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-2.5 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'delivered':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'in-transit':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'processing':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in-transit':
        return 'In Transit';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600 text-sm lg:text-base">Monitor and control orders across all categories</p>
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
                  placeholder="Search by order ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
                <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button className="inline-flex items-center px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 px-6 py-4">
              <div className="col-span-2 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-1 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-1 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </span>
                <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </div>
              <div className="col-span-1 flex items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
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
            {filteredOrders.map((order) => (
              <div key={order.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50">
                <div className="col-span-2 flex items-center">
                  <span className="text-sm font-medium text-gray-900">{order.id}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-900">{order.customer}</span>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className="text-sm text-gray-900">{order.category}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-900">{order.vendor}</span>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className={getStatusBadge(order.status)}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-900">{order.date}</span>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className="text-sm font-medium text-gray-900">{order.total}</span>
                </div>
                <div className="col-span-1 flex items-center">
                  <div className="flex space-x-1">
                    {order.status === 'processing' && (
                      <>
                        <button className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {order.status === 'in-transit' && (
                      <>
                        <button className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-white border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">5</span> of <span className="font-medium">5</span> orders
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Previous
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-md">
                  1
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Table View */}
        <div className="lg:hidden bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
          <div className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{order.id}</span>
                  <span className={getStatusBadge(order.status)}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="text-sm text-gray-900 mb-1">{order.customer}</div>
                <div className="text-sm text-gray-600 mb-2">{order.category} • {order.vendor}</div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{order.date}</span>
                  <span className="font-medium text-gray-900">{order.total}</span>
                </div>
                <div className="flex items-center justify-end mt-3 space-x-2">
                  {order.status === 'processing' && (
                    <>
                      <button className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {order.status === 'in-transit' && (
                    <button className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
