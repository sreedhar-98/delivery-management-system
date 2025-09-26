import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Store, 
  Truck, 
  HelpCircle,
  X 
} from 'lucide-react';

const Sidebar = ({ activeItem, setActiveItem, sidebarOpen, closeSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart },
    { id: 'vendors', label: 'Vendor Management', icon: Store },
    { id: 'delivery', label: 'Delivery Partners', icon: Truck },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  const handleMenuClick = (itemId) => {
    setActiveItem(itemId);
    closeSidebar();
  };

  return (
    <>
      {/* Unified Sidebar for all screen sizes */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-800 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-indigo-700 flex items-center justify-between">
          <h1 className="text-white text-xl font-bold">Delivrry Admin</h1>
          <button 
            onClick={closeSidebar}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItem;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
