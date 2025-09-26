import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { fetchAlerts, selectAlerts, selectAlertsLoading, selectAlertsError } from '../store/slices/alertsSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const iconMap = {
  error: AlertTriangle,
  warning: AlertCircle,
  info: Info,
};

const AlertsPanel = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(selectAlerts);
  const loading = useSelector(selectAlertsLoading);
  const error = useSelector(selectAlertsError);

  useEffect(() => {
    dispatch(fetchAlerts());
  }, [dispatch]);

  const getIconColor = (type) => {
    switch (type) {
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
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
        <h3 className="text-sm lg:text-base font-medium text-gray-900">Alerts & Notifications</h3>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        <div className="space-y-1">
          {alerts.map((alert, index) => {
            const Icon = iconMap[alert.type];
            
            return (
              <div key={alert.id} className={`p-3 lg:p-4 ${index > 0 ? 'border-t border-gray-200' : ''}`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${getIconColor(alert.type)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm font-medium text-gray-900 mb-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  
                  <button className="flex-shrink-0 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-3 lg:p-4 border-t border-gray-200">
        <button className="text-xs lg:text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default AlertsPanel;