import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HelpCircle, PlusCircle, AlertCircle, FileText, PauseCircle } from 'lucide-react';
import {
  fetchQuickActions,
  selectQuickActions,
  selectQuickActionsLoading,
  selectQuickActionsError,
} from '../store/slices/quickActionsSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const iconMap = {
  "Add New Vendor": PlusCircle,
  "Dispatch Emergency Team": AlertCircle,
  "Generate Payout Report": FileText,
  "Pause All Deliveries": PauseCircle,
};

const QuickActions = () => {
  const dispatch = useDispatch();
  const actions = useSelector(selectQuickActions);
  const loading = useSelector(selectQuickActionsLoading);
  const error = useSelector(selectQuickActionsError);

  useEffect(() => {
    dispatch(fetchQuickActions());
  }, [dispatch]);

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
        <h3 className="text-sm lg:text-base font-medium text-gray-900">
          Quick Actions
        </h3>
      </div>

      <div className="p-4 lg:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          {actions.map((action, index) => {
            const Icon = iconMap[action.label] || HelpCircle;

            return (
              <button
                key={index}
                onClick={() => window.location.href = action.action}
                className="flex items-center p-3 lg:p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>

                <div className="ml-3 text-left">
                  <h4 className="text-sm font-medium text-gray-900">{action.label}</h4>
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
