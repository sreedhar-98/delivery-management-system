import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import { 
  fetchDeliveryShifts, 
  fetchWeeklySchedule, 
  selectDeliveryShifts, 
  selectWeeklySchedule, 
  selectDeliveryShiftsLoading, 
  selectDeliveryShiftsError 
} from '../store/slices/deliveryShiftsSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const getStatusBadge = (status) => {
  const baseClasses = "px-2.5 py-1 rounded-full text-xs font-medium capitalize";
  switch (status) {
    case 'scheduled':
      return `${baseClasses} bg-blue-100 text-blue-800`;
    case 'active':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'completed':
      return `${baseClasses} bg-purple-100 text-purple-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

const ShiftActions = ({ status }) => {
  if (status === 'completed') {
    return (
      <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Eye className="w-4 h-4" /></button>
    );
  }
  if (status === 'active') {
    return (
      <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Eye className="w-4 h-4" /></button>
    );
  }
  return (
    <>
      <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><Eye className="w-4 h-4" /></button>
      <button className="p-1 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50"><Edit className="w-4 h-4" /></button>
      <button className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
    </>
  );
};

const DeliveryShifts = () => {
  const dispatch = useDispatch();
  const shifts = useSelector(selectDeliveryShifts);
  const weeklySchedule = useSelector(selectWeeklySchedule);
  const loading = useSelector(selectDeliveryShiftsLoading);
  const error = useSelector(selectDeliveryShiftsError);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchDeliveryShifts());
    dispatch(fetchWeeklySchedule());
  }, [dispatch]);

  const filteredShifts = shifts.filter(shift =>
    Object.values(shift).some(val =>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-3 md:mb-0">Shift Scheduler</h2>
          <button className="inline-flex items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Shift
          </button>
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search shifts..."
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
        </div>

        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Shift ID', 'Driver', 'Date', 'Time', 'Zone', 'Status', 'Actions'].map(header => (
                  <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredShifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shift.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.driver}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.zone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(shift.status)}>{shift.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-1">
                      <ShiftActions status={shift.status} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden grid grid-cols-1 gap-4">
            {filteredShifts.map((shift) => (
                <div key={shift.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="font-medium text-gray-900">{shift.id}</p>
                            <p className="text-sm text-gray-700">{shift.driver}</p>
                        </div>
                        <span className={getStatusBadge(shift.status)}>{shift.status}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 mb-3">
                        <p><strong>Date:</strong> {shift.date}</p>
                        <p><strong>Time:</strong> {shift.time}</p>
                        <p><strong>Zone:</strong> {shift.zone}</p>
                    </div>
                    <div className="flex justify-end items-center border-t pt-3">
                        <div className="flex items-center space-x-1">
                            <ShiftActions status={shift.status} />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="bg-white lg:bg-transparent rounded-b-lg border-t lg:border-none border-gray-200 px-4 py-3 mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredShifts.length}</span> of <span className="font-medium">{shifts.length}</span> shifts
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md">1</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-gray-500" />
          Weekly Schedule
        </h3>
        <div className="space-y-2 mb-4">
          {weeklySchedule.map((item) => (
            <div key={item.day} className={`p-3 rounded-md border-l-4 ${item.color} bg-gray-50`}>
              <p className="font-medium text-sm text-gray-800">{item.day}</p>
              <p className="text-xs text-gray-600">{item.shifts}</p>
            </div>
          ))}
        </div>
        <button className="w-full inline-flex justify-center items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Schedule Week
        </button>
      </div>
    </div>
  );
};

export default DeliveryShifts;