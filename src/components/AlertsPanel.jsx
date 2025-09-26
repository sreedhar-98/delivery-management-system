import React from 'react';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      type: 'error',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      message: 'Failed delivery: Order #38291 - Driver reported address issue',
      time: '10 minutes ago',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      type: 'warning',
      icon: AlertCircle,
      iconColor: 'text-yellow-600',
      message: 'Vendor \'Fresh Meats Co.\' has low stock on 3 popular items',
      time: '25 minutes ago',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertCircle,
      iconColor: 'text-yellow-600',
      message: 'Customer complaint: Order #37654 arrived cold',
      time: '1 hour ago',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 4,
      type: 'info',
      icon: Info,
      iconColor: 'text-blue-600',
      message: 'System maintenance scheduled for tonight at 2 AM',
      time: '2 hours ago',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 lg:p-5 border-b border-gray-200">
        <h3 className="text-sm lg:text-base font-medium text-gray-900">Alerts & Notifications</h3>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        <div className="space-y-1">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            
            return (
              <div key={alert.id} className={`p-3 lg:p-4 ${index > 0 ? 'border-t border-gray-200' : ''}`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${alert.iconColor}`} />
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
