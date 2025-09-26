import React, { useState } from 'react';
import { Search, ClipboardList } from 'lucide-react';

const Support = () => {
  const [issueDescription, setIssueDescription] = useState('');
  const [ticketSearch, setTicketSearch] = useState('');

  const previousTickets = [
    {
      id: 'BL-25139',
      title: 'BL-25139-Testing',
      status: 'Completed',
    },
    {
      id: 'RA-24555',
      title: 'RA-24555-Page took too long to load and the back button was unresponsive in empty chat',
      status: 'Completed',
    },
    {
      id: 'RA-24395',
      title: 'RA-24395-Testing',
      status: 'Completed',
    },
  ];

  const filteredTickets = previousTickets.filter(ticket =>
    ticket.title.toLowerCase().includes(ticketSearch.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Support 24x7</h1>
        </div>

        {/* New Ticket Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="issue-description" className="block text-sm font-medium text-gray-700 mb-2">
              Describe the Issue <span className="text-red-500">*</span>
            </label>
            <textarea
              id="issue-description"
              rows="5"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Please describe your issue in detail..."
              className="w-full p-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          <button className="inline-flex items-center px-6 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit Ticket
          </button>
        </div>

        {/* Previous Tickets Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Previous Tickets</h2>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your previous tickets..."
              value={ticketSearch}
              onChange={(e) => setTicketSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Ticket List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket, index) => (
              <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm font-medium text-gray-800 flex-1 min-w-[200px]">
                  {index + 1}. {ticket.title}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                    {ticket.status}
                  </span>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                    <ClipboardList className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Support;
