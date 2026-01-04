import React from 'react';
import * as Icons from './Icons';

const Navigation = ({ currentPage, setPage, isDarkTheme, setIsDarkTheme, currentTime, displayName }) => {
  const navClasses = isDarkTheme
    ? 'bg-slate-900/70'
    : 'bg-white/70';

  const navItems = [
    { id: 'home', label: 'Home', icon: Icons.Home, color: 'blue' },
    { id: 'notes', label: 'Notes', icon: Icons.StickyNote, color: 'purple' },
    { id: 'tasks', label: 'Tasks', icon: Icons.ListTodo, color: 'indigo' },
    { id: 'goals', label: 'Goals', icon: Icons.Target, color: 'green' },
    { id: 'habits', label: 'Habits', icon: Icons.Zap, color: 'orange' },
    { id: 'settings', label: 'Settings', icon: Icons.Settings, color: 'gray' }
  ];

  const getActiveColor = (color, isActive) => {
    if (!isActive) return '';
    
    const colorMap = {
      blue: 'text-blue-500',
      purple: 'text-purple-500',
      indigo: 'text-indigo-500',
      green: 'text-green-500',
      orange: 'text-orange-500',
      gray: 'text-gray-500'
    };
    
    return colorMap[color] || 'text-blue-500';
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <div className={`fixed top-0 left-0 right-0 ${navClasses} backdrop-blur-xl backdrop-saturate-180 rounded-b-2xl shadow-lg z-40`}>
        <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-sm">
            {currentTime.toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDarkTheme ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
            </button>
           <button
  onClick={() => setPage('settings')}
  className="p-2 rounded-full hover:bg-white/10 transition"
  title="Profile / Settings"
>
  <Icons.User size={20} />
</button>

          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className={`fixed bottom-0 left-0 right-0 ${navClasses} backdrop-blur-xl backdrop-saturate-180 rounded-t-2xl shadow-lg z-40`}>
        <div className="max-w-md mx-auto px-2 py-3">
          <div className="grid grid-cols-6 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`nav-button flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                    isActive ? 'active ' + getActiveColor(item.color, true) : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label={item.label}
                >
                  <Icon size={20} className="mb-1" />
                  <span className="text-xs font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
