import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Layout = ({ children }) => {
  const { user } = useAppContext();
  const location = useLocation();

  const navItems = [
    { path: '/owner', label: 'Dashboard', icon: 'dashboard' },
    { path: '/owner/add-room', label: 'Add Room', icon: 'add' },
    { path: '/owner/list-room', label: 'List Rooms', icon: 'list' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          
          <div className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-gray-700'
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className={`mr-3`}>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}

            <a
              href="/"
              onClick={() => window.location.href = '/'}
              className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-3">🏠</span>
              <span>Back to Home</span>
            </a>

            <button
              onClick={() => window.location.href = '/logout'}
              className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-3">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
