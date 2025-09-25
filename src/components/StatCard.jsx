import React from 'react';

const StatCard = ({ title, value, change, icon: Icon, iconBg, iconColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
      <div className="flex items-center">
        <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        
        <div className="ml-3 lg:ml-4 flex-1">
          <h3 className="text-xs lg:text-sm font-medium text-gray-600">{title}</h3>
          <div className="flex items-center mt-1">
            <p className="text-xl lg:text-2xl font-semibold text-gray-900">{value}</p>
            <span className="ml-2 text-xs lg:text-sm font-medium text-green-600">{change}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
