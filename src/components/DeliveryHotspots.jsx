import React from 'react';

const DeliveryHotspots = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 lg:p-5 border-b border-gray-200">
        <h3 className="text-sm lg:text-base font-medium text-gray-900">Delivery Hotspots</h3>
      </div>
      
      <div className="p-4 lg:p-5">
        <div className="bg-gray-100 rounded-lg h-48 lg:h-64 flex items-center justify-center">
          <p className="text-gray-500 text-xs lg:text-sm">Heatmap visualization would appear here</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHotspots;
