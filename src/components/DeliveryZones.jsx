import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Save, Plus, MapPin } from 'lucide-react';
import { fetchDeliveryZones, selectDeliveryZones, selectDeliveryZonesLoading, selectDeliveryZonesError } from '../store/slices/deliveryZonesSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const ZoneMap = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative h-[472px]">
      <div className="bg-gray-100 rounded-lg h-full w-full relative overflow-hidden">
        {/* Zones drawn on map */}
        <div className="absolute top-[133px] left-[158px] w-[168px] h-[156px] bg-[#4CAF50]/20 border-2 border-[#4CAF50] rounded-lg"></div>
        <div className="absolute top-[142px] left-[174px] w-[300px] h-[84px] bg-[#2196F3]/20 border-2 border-[#2196F3] rounded-lg"></div>
        <div className="absolute top-[99px] left-[362px] w-[226px] h-[163px] bg-[#FFC107]/20 border-2 border-[#FFC107] rounded-lg"></div>
        <div className="absolute top-[145px] left-[478px] w-[295px] h-[159px] bg-[#9C27B0]/20 border-2 border-[#9C27B0] rounded-lg"></div>
        <div className="absolute top-[200px] left-[405px] w-[185px] h-[139px] bg-[#F44336]/20 border-2 border-[#F44336] rounded-lg"></div>

        {/* Zone labels on map */}
        <div className="absolute top-[265px] left-[164px] bg-white px-2 py-1 rounded text-[10px] font-medium shadow">Manhattan Downtown</div>
        <div className="absolute top-[201px] left-[180px] bg-white px-2 py-1 rounded text-[10px] font-medium shadow">Brooklyn Heights</div>
        <div className="absolute top-[238px] left-[368px] bg-white px-2 py-1 rounded text-[10px] font-medium shadow">Queens Central</div>
        <div className="absolute top-[280px] left-[484px] bg-white px-2 py-1 rounded text-[10px] font-medium shadow">Bronx North</div>
        <div className="absolute top-[315px] left-[411px] bg-white px-2 py-1 rounded text-[10px] font-medium shadow">Staten Island</div>

        {/* Interactive map popup */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl border w-64 text-center">
          <MapPin className="mx-auto text-gray-400 w-8 h-8 mb-2" />
          <h4 className="font-medium text-gray-800 text-sm">Interactive Zone Map</h4>
          <p className="text-xs text-gray-500 mt-1">Click and drag to create or modify zones</p>
        </div>
      </div>
    </div>
  );
};

const ZoneDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full min-h-[200px] flex flex-col">
      <h3 className="text-base font-medium text-gray-900 mb-6 flex-shrink-0">Zone Details</h3>
      <div className="flex flex-col items-center justify-center text-center flex-grow">
        <MapPin className="w-10 h-10 text-gray-400 mb-4" />
        <p className="text-sm font-medium text-gray-700">Select a zone on the map to view details</p>
      </div>
    </div>
  );
};

const ZoneCard = ({ zone }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <div className="flex items-center justify-between mb-3">
      <h4 className="font-medium text-gray-900">{zone.name}</h4>
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: zone.color }}></div>
    </div>
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div className="text-gray-600">
        Orders: <span className="font-medium text-gray-900">{zone.orders}</span>
      </div>
      <div className="text-gray-600">
        Drivers: <span className="font-medium text-gray-900">{zone.drivers}</span>
      </div>
      <div className="text-gray-600">
        Routes: <span className="font-medium text-gray-900">{zone.routes}</span>
      </div>
    </div>
  </div>
);

const DeliveryZones = () => {
  const dispatch = useDispatch();
  const zones = useSelector(selectDeliveryZones);
  const loading = useSelector(selectDeliveryZonesLoading);
  const error = useSelector(selectDeliveryZonesError);

  useEffect(() => {
    dispatch(fetchDeliveryZones());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center p-10"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center p-10"><ErrorMessage error={error} /></div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 md:mb-0">Delivery Zones</h2>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
          <button className="inline-flex items-center px-4 py-2.5 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Zone
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <ZoneMap />
        </div>
        <div>
          <ZoneDetails />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4 mb-6 flex-wrap gap-y-2">
        <span className="text-sm font-medium text-gray-700">Map Controls:</span>
        <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200">Draw Zone</button>
        <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200">Edit Shape</button>
        <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200">Set Boundaries</button>
        <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200">Clear Selection</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-medium text-gray-900">All Zones</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
          {zones.map(zone => (
            <ZoneCard key={zone.name} zone={zone} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryZones;