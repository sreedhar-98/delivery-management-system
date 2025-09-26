import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scale, UserX, Megaphone, Shield } from 'lucide-react';
import { fetchQuickActions, selectQuickActions, selectQuickActionsLoading, selectQuickActionsError } from '../store/slices/quickActionsSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const iconMap = {
  Scale,
  UserX,
  Megaphone,
  Shield,
};

const QuickActions = () => {
  const dispatch = useDispatch();
  const actions = useSelector(selectQuickActions);
  const loading = useSelector(selectQuickActionsLoading);
  const error = useSelector(selectQuickActionsError);

  useEffect(() => {
    dispatch(fetchQuickActions());
  }, [dispatch]);

  const getIconStyle = (icon) => {
    switch (icon) {
      case 'Scale': return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
      case 'UserX': return { bg: 'bg-red-100', text: 'text-red-700' };
      case 'Megaphone': return { bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'Shield': return { bg: 'bg-green-100', text: 'text-green-700' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center" style={{ minHeight: '200px' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center" style={{ minHeight: '200px' }}>
        <ErrorMessage error={error} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 lg:p-5 border-b border-gray-200">
        <h3 className="text-sm lg:text-base font-medium text-gray-900">Quick Actions</h3>
      </div>
      
      <div className="p-4 lg:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          {actions.map((action) => {
            const Icon = iconMap[action.icon];
            const { bg, text } = getIconStyle(action.icon);
            
            return (
              <button
                key={action.id}
                className="flex items-center p-3 lg:p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center ${bg}`}>
                  <Icon className={`w-4 h-4 lg:w-6 lg:h-6 ${text}`} />
                </div>
                
                <div className="ml-3 text-left">
                  <h4 className="text-xs lg:text-sm font-medium text-gray-900">{action.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;