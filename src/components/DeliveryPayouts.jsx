import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Download,
  DollarSign,
  Eye,
  Check
} from 'lucide-react';
import { 
  fetchDeliveryPayouts, 
  selectDeliveryPayouts, 
  selectDeliveryPayoutsLoading, 
  selectDeliveryPayoutsError 
} from '../store/slices/deliveryPayoutsSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const getStatusBadge = (status) => {
  const baseClasses = "px-2.5 py-1 rounded-full text-xs font-medium capitalize";
  switch (status) {
    case 'paid':
      return `${baseClasses} bg-[#DCFCE7] text-[#166534]`;
    case 'pending':
      return `${baseClasses} bg-[#FEF9C3] text-[#854D0E]`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

const PayoutActions = ({ status }) => {
  if (status === 'paid') {
    return (
      <>
        <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Eye className="w-4 h-4" /></button>
        <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><Download className="w-4 h-4" /></button>
      </>
    );
  }
  return (
    <>
      <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Eye className="w-4 h-4" /></button>
      <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><Download className="w-4 h-4" /></button>
      <button className="p-1 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50"><Check className="w-4 h-4" /></button>
    </>
  );
};

const DeliveryPayouts = () => {
  const dispatch = useDispatch();
  const payouts = useSelector(selectDeliveryPayouts);
  const loading = useSelector(selectDeliveryPayoutsLoading);
  const error = useSelector(selectDeliveryPayoutsError);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchDeliveryPayouts());
  }, [dispatch]);

  const filteredPayouts = payouts.filter(payout =>
    Object.values(payout).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return <div className="text-center p-10"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center p-10"><ErrorMessage error={error} /></div>;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 md:mb-0">Earnings & Payouts</h2>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700">
              <DollarSign className="w-4 h-4 mr-2" />
              Process Payouts
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search payouts..."
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

        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Driver', 'Deliveries', 'Amount', 'Period', 'Payment Date', 'Status', 'Method', 'Actions'].map(header => (
                  <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayouts.map((payout, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payout.driver}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payout.deliveries}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${payout.amount.toFixed(2)}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${Number(payout.amount ?? 0).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payout.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payout.paymentDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(payout.status)}>{payout.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payout.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-1">
                      <PayoutActions status={payout.status} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden grid grid-cols-1 gap-4">
            {filteredPayouts.map((payout, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="font-medium text-gray-900">{payout.driver}</p>
                            <p className="text-sm text-gray-700 font-semibold">${Number(payout.amount ?? 0).toFixed(2)}</p>
                        </div>
                        <span className={getStatusBadge(payout.status)}>{payout.status}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 mb-3 border-t border-b py-3">
                        <p><strong>Deliveries:</strong> {payout.deliveries}</p>
                        <p><strong>Period:</strong> {payout.period}</p>
                        <p><strong>Payment Date:</strong> {payout.paymentDate}</p>
                        <p><strong>Method:</strong> {payout.method}</p>
                    </div>
                    <div className="flex justify-end items-center">
                        <div className="flex items-center space-x-1">
                            <PayoutActions status={payout.status} />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="bg-white lg:bg-transparent rounded-b-lg border-t lg:border-none border-gray-200 px-4 py-3 mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredPayouts.length}</span> of <span className="font-medium">{payouts.length}</span> payouts
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md">1</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
          Payout Summary
        </h3>
        
        <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Current Period</p>
                <p className="text-base font-medium text-gray-800 mb-3">Jun 16-30, 2023</p>
                <div className="flex justify-between items-center text-sm">
                    <div>
                        <p className="text-gray-600">Pending</p>
                        <p className="font-medium text-gray-800">$710.75</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Drivers</p>
                        <p className="font-medium text-gray-800">3</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Last Period</p>
                <p className="text-base font-medium text-gray-800 mb-3">Jun 1-15, 2023</p>
                <div className="flex justify-between items-center text-sm">
                    <div>
                        <p className="text-gray-600">Paid</p>
                        <p className="font-medium text-gray-800">$1,512.30</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Drivers</p>
                        <p className="font-medium text-gray-800">4</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Payment Schedule</h4>
            <ul className="text-sm space-y-2">
                <li className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Bi-weekly</span>
                    <span className="font-medium text-gray-800">1st & 16th</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="font-medium text-gray-800">1-2 business days</span>
                </li>
                <li className="flex justify-between items-center">
                    <span className="text-gray-600">Next Payout</span>
                    <span className="font-medium text-gray-800">Jul 1, 2023</span>
                </li>
            </ul>
        </div>
        
        <button className="w-full inline-flex justify-center items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700">
          <DollarSign className="w-4 h-4 mr-2" />
          View Payout Reports
        </button>
      </div>
    </div>
  );
};

export default DeliveryPayouts;