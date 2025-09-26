import React from 'react';
import { Scale, UserX, Megaphone, Shield } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: 'Resolve Disputes',
      description: '3 pending disputes need attention',
      icon: Scale,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-700'
    },
    {
      id: 2,
      title: 'Suspend Accounts',
      description: 'Review 2 flagged accounts',
      icon: UserX,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-700'
    },
    {
      id: 3,
      title: 'Push Announcement',
      description: 'Notify users of platform updates',
      icon: Megaphone,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700'
    },
    {
      id: 4,
      title: 'System Status',
      description: 'All systems operational',
      icon: Shield,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-700'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 lg:p-5 border-b border-gray-200">
        <h3 className="text-sm lg:text-base font-medium text-gray-900">Quick Actions</h3>
      </div>
      
      <div className="p-4 lg:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            
            return (
              <button
                key={action.id}
                className="flex items-center p-3 lg:p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center ${action.iconBg}`}>
                  <Icon className={`w-4 h-4 lg:w-6 lg:h-6 ${action.iconColor}`} />
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
