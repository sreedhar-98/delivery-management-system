import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Users, DollarSign, Truck } from 'lucide-react';
import { fetchStats, selectStats, selectStatsLoading, selectStatsError } from '../../store/slices/statsSlice';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const iconMap = {
  ShoppingCart,
  Users,
  DollarSign,
  Truck
};

const EnhancedStatCard = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectStats);
  const loading = useSelector(selectStatsLoading);
  const error = useSelector(selectStatsError);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <LoadingSpinner size="medium" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage error={error} className="mb-6" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon] || ShoppingCart;
        
        return (
          <div key={stat.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center bg-indigo-100">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              
              <div className="ml-3 lg:ml-4 flex-1">
                <h3 className="text-xs lg:text-sm font-medium text-gray-600">{stat.title}</h3>
                <div className="flex items-center mt-1">
                  <p className="text-xl lg:text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span className="ml-2 text-xs lg:text-sm font-medium text-green-600">{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EnhancedStatCard;