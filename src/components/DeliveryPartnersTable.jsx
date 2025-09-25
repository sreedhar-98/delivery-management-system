import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Plus, 
  Download, 
  Edit, 
  Trash2,
  Check,
  MoreHorizontal
} from 'lucide-react';

const DeliveryPartnersTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const partners = [
    {
      id: 201,
      name: 'David Martinez',
      email: 'david.m@example.com',
      region: 'New York',
      status: 'active',
      deliveries: 87,
      rating: 4.8,
    },
    {
      id: 202,
      name: 'Jessica Lee',
      email: 'jessica.l@example.com',
      region: 'Los Angeles',
      status: 'active',
      deliveries: 65,
      rating: 4.9,
    },
    {
      id: 203,
      name: 'Kevin Wilson',
      email: 'kevin.w@example.com',
      region: 'Chicago',
      status: 'pending',
      deliveries: 0,
      rating: 0,
    },
  ];

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

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search and Actions */}
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

          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
              <Plus className="w-4 h-4 mr-2" />
              Add Partner
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
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
            {filteredPartners.map((partner) => (
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
                      <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Edit className="w-4 h-4" /></button>
                    )}
                    <button className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Cards */}
      <div className="lg:hidden grid grid-cols-1 gap-4">
        {filteredPartners.map((partner) => (
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
                          <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Edit className="w-4 h-4" /></button>
                        )}
                        <button className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white lg:bg-transparent rounded-b-lg border-t border-gray-200 px-6 py-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredPartners.length}</span> of <span className="font-medium">{partners.length}</span> delivery partners
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">Previous</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-md">1</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnersTable;
