import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Plus, 
  Eye, 
  Check,
  HelpCircle,
  Download
} from 'lucide-react';

const tickets = [
    { id: 'TICKET-1001', driver: 'David Martinez', issue: 'App not showing delivery details', type: 'Technical', status: 'open', priority: 'high', created: 'Jun 14, 2023, 10:23 AM' },
    { id: 'TICKET-1002', driver: 'Jessica Lee', issue: 'Customer gave wrong address', type: 'Delivery', status: 'pending', priority: 'medium', created: 'Jun 13, 2023, 3:45 PM' },
    { id: 'TICKET-1003', driver: 'Maria Rodriguez', issue: 'Payment not received for June 10 shifts', type: 'Payment', status: 'resolved', priority: 'high', created: 'Jun 12, 2023, 5:30 PM' },
    { id: 'TICKET-1004', driver: 'David Martinez', issue: 'Unable to mark delivery as completed', type: 'Technical', status: 'open', priority: 'high', created: 'Jun 14, 2023, 2:15 PM' },
    { id: 'TICKET-1005', driver: 'James Johnson', issue: 'Request for more shifts', type: 'Schedule', status: 'pending', priority: 'low', created: 'Jun 13, 2023, 11:30 AM' },
];

const summaryData = [
    { label: 'Open Tickets', value: 3, color: 'red' },
    { label: 'Pending', value: 5, color: 'yellow' },
    { label: 'Resolved Today', value: 12, color: 'green' },
    { label: 'Total Active', value: 24, color: 'blue' },
];

const issueTypes = [
    { name: 'Technical', percentage: 45, color: 'bg-red-500' },
    { name: 'Delivery', percentage: 30, color: 'bg-blue-500' },
    { name: 'Payment', percentage: 15, color: 'bg-green-500' },
    { name: 'Schedule', percentage: 10, color: 'bg-purple-500' },
];

const getStatusBadge = (status) => {
  const baseClasses = "px-2.5 py-1 rounded-full text-xs font-medium capitalize";
  switch (status) {
    case 'open':
      return `${baseClasses} bg-red-100 text-red-800`;
    case 'pending':
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    case 'resolved':
      return `${baseClasses} bg-green-100 text-green-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

const getPriorityBadge = (priority) => {
    const baseClasses = "px-2.5 py-1 rounded-full text-xs font-medium capitalize";
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
};

const TicketActions = ({ status }) => {
  return (
    <div className="flex items-center space-x-1">
      <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Eye className="w-4 h-4" /></button>
      {status !== 'resolved' && (
        <button className="p-1 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50"><Check className="w-4 h-4" /></button>
      )}
    </div>
  );
};

const SummaryCard = ({ item }) => {
    const colors = {
        red: { bg: 'bg-red-50', text: 'text-red-600' },
        yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
        green: { bg: 'bg-green-50', text: 'text-green-600' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    };
    return (
        <div className={`${colors[item.color].bg} p-4 rounded-lg text-center`}>
            <p className={`text-3xl font-bold ${colors[item.color].text}`}>{item.value}</p>
            <p className={`text-sm font-medium ${colors[item.color].text} mt-1`}>{item.label}</p>
        </div>
    );
};

const DeliverySupport = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(ticket =>
    Object.values(ticket).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="xl:col-span-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 md:mb-0">Partner Support</h2>
          <button className="inline-flex items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Ticket ID', 'Driver', 'Issue', 'Type', 'Status', 'Priority', 'Created', 'Actions'].map(header => (
                  <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.driver}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">{ticket.issue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={getStatusBadge(ticket.status)}>{ticket.status}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={getPriorityBadge(ticket.priority)}>{ticket.priority}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><TicketActions status={ticket.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
            {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="font-medium text-gray-900">{ticket.id}</p>
                            <p className="text-sm text-gray-700">{ticket.driver}</p>
                        </div>
                        <span className={getStatusBadge(ticket.status)}>{ticket.status}</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{ticket.issue}</p>
                    <div className="text-xs text-gray-600 space-y-1 mb-3">
                        <p><strong>Type:</strong> {ticket.type} • <span className={getPriorityBadge(ticket.priority)}>{ticket.priority}</span></p>
                        <p><strong>Created:</strong> {ticket.created}</p>
                    </div>
                    <div className="flex justify-end items-center border-t pt-3">
                        <TicketActions status={ticket.status} />
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="bg-white lg:bg-transparent rounded-b-lg border-t lg:border-none border-gray-200 px-4 py-3 mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredTickets.length}</span> of <span className="font-medium">{tickets.length}</span> tickets
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md">1</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
          <HelpCircle className="w-5 h-5 mr-2 text-gray-500" />
          Support Summary
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
            {summaryData.map(item => <SummaryCard key={item.label} item={item} />)}
        </div>
        
        <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Issue Types</h4>
            <div className="space-y-3">
                {issueTypes.map(type => (
                    <div key={type.name}>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>{type.name}</span>
                            <span>{type.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`${type.color} h-2 rounded-full`} style={{ width: `${type.percentage}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <button className="w-full inline-flex justify-center items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          View Support Dashboard
        </button>
      </div>
    </div>
  );
};

export default DeliverySupport;
