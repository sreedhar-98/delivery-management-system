import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  ListFilter as Filter, 
  RotateCcw, 
  RefreshCw, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';
import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  setSearchTerm,
  setFilters,
  clearFilters,
  clearError,
  selectFilteredOrders,
  selectOrdersLoading,
  selectOrdersError,
  selectOrdersSearchTerm
} from '../store/slices/ordersSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFilteredOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);
  const searchTerm = useSelector(selectOrdersSearchTerm);

  useEffect(() => {
    dispatch(fetchOrders());
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await dispatch(deleteOrder(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete order:', error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2.5 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'delivered':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'in-transit':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'processing':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600 text-sm lg:text-base">Monitor and control orders across all categories</p>
        </div>

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
                  placeholder="Search by order ID or customer..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select
                  onChange={(e) => handleFilter('status', e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="in-transit">In-transit</option>
                  <option value="processing">Processing</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button 
                  onClick={handleClearFilters}
                  className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => dispatch(fetchOrders())} className="inline-flex items-center px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
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

        {loading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="large" />
          </div>
        )}

        {!loading && (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-4">
                  <div className="col-span-2">Order ID</div>
                  <div className="col-span-2">Customer</div>
                  <div className="col-span-1">Category</div>
                  <div className="col-span-2">Vendor</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Total</div>
                  <div className="col-span-1">Actions</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50">
                    <div className="col-span-2 text-sm font-medium text-gray-900">{order.id}</div>
                    <div className="col-span-2 text-sm text-gray-900">{order.customer}</div>
                    <div className="col-span-1 text-sm text-gray-900">{order.category}</div>
                    <div className="col-span-2 text-sm text-gray-900">{order.vendor}</div>
                    <div className="col-span-1">
                      <span className={getStatusBadge(order.status)}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="col-span-2 text-sm text-gray-900">{order.date}</div>
                    <div className="col-span-1 text-sm font-medium text-gray-900">{order.total}</div>
                    <div className="col-span-1 flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(order.id)} className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
              {orders.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No orders found.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;