import React, { useState } from 'react';
import * as Icons from './Icons';
import { formatIndianRupee } from '../utils/helpers';
import { STORAGE_KEYS } from '../utils/constants';

const SettingsPage = ({ 
  isDarkTheme,
  displayName,
  setDisplayName,
  monthlySalary,
  setMonthlySalary,
  setMonthlyLimit,
  setIncome,
  userId,
  onLogout,
  handle3DMove,
  handle3DLeave
}) => {
  const [editingName, setEditingName] = useState(false);
  const [editingSalary, setEditingSalary] = useState(false);
  const [tempName, setTempName] = useState(displayName);
  const [tempSalary, setTempSalary] = useState(monthlySalary);

  const cardClasses = isDarkTheme
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
    : 'bg-white border-2 border-blue-200';

  const handleSaveName = () => {
    if (tempName.trim()) {
      setDisplayName(tempName.trim());
      setEditingName(false);
    }
  };

  const handleCancelName = () => {
    setTempName(displayName);
    setEditingName(false);
  };

  const handleSaveSalary = () => {
    const salary = parseFloat(tempSalary);
    if (salary > 0) {
      setMonthlySalary(salary);
      setMonthlyLimit(salary);
      setIncome(salary);
      setEditingSalary(false);
    }
  };

  const handleCancelSalary = () => {
    setTempSalary(monthlySalary);
    setEditingSalary(false);
  };

  const getLoginDate = () => {
    const loginDate = localStorage.getItem(STORAGE_KEYS.LOGIN_DATE);
    if (loginDate) {
      return new Date(loginDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Today';
  };

  return (
    <div className="space-y-4 animate-slideIn">
      {/* Header */}
      <h1 className="text-3xl font-black">SETTINGS</h1>

      {/* Display Name Card */}
      <div
        className={`${cardClasses} p-6 rounded-2xl shadow-lg card-3d`}
        onMouseMove={(e) => handle3DMove(e, 25)}
        onMouseLeave={handle3DLeave}
      >
        <div className="flex items-center gap-3 mb-4">
          <Icons.User size={24} className="text-blue-500" />
          <h3 className="text-lg font-bold">Display Name</h3>
        </div>

        {editingName ? (
          <div className="space-y-3">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none ${
                isDarkTheme
                  ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter display name"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveName}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Icons.Save size={18} />
                Save
              </button>
              <button
                onClick={handleCancelName}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  isDarkTheme
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{displayName}</p>
            <button
              onClick={() => setEditingName(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all"
            >
              <Icons.Edit2 size={16} />
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Monthly Salary Card */}
      <div
        className={`${cardClasses} p-6 rounded-2xl shadow-lg card-3d`}
        onMouseMove={(e) => handle3DMove(e, 25)}
        onMouseLeave={handle3DLeave}
      >
        <div className="flex items-center gap-3 mb-4">
          <Icons.IndianRupee size={24} className="text-green-500" />
          <h3 className="text-lg font-bold">Monthly Salary & Budget</h3>
        </div>

        {editingSalary ? (
          <div className="space-y-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold">₹</span>
              <input
                type="number"
                value={tempSalary}
                onChange={(e) => setTempSalary(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none ${
                  isDarkTheme
                    ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                    : 'bg-white border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter monthly salary"
                min="0"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveSalary}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Icons.Save size={18} />
                Save
              </button>
              <button
                onClick={handleCancelSalary}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  isDarkTheme
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-3xl font-black">{formatIndianRupee(monthlySalary)}</p>
            <button
              onClick={() => setEditingSalary(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all"
            >
              <Icons.Edit2 size={16} />
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Account Info Card */}
      <div
        className={`${cardClasses} p-6 rounded-2xl shadow-lg card-3d`}
        onMouseMove={(e) => handle3DMove(e, 25)}
        onMouseLeave={handle3DLeave}
      >
        <h3 className="text-lg font-bold mb-4">Account Info</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className={isDarkTheme ? 'text-slate-400' : 'text-gray-600'}>User ID:</span>
            <span className="font-bold">{userId}</span>
          </div>
          
          <div className="flex justify-between">
            <span className={isDarkTheme ? 'text-slate-400' : 'text-gray-600'}>Login Date:</span>
            <span className="font-bold">{getLoginDate()}</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Icons.LogOut size={18} />
          Logout
        </button>
      </div>

      {/* App Info */}
      <div className={`${cardClasses} p-6 rounded-2xl shadow-lg text-center`}>
        <p className="text-sm font-semibold mb-2">Personal Manager</p>
        <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-gray-500'}`}>
          Indian Edition v1.0.0
        </p>
        <p className={`text-xs mt-2 ${isDarkTheme ? 'text-slate-500' : 'text-gray-400'}`}>
          Made with ❤️ in India 🇮🇳
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
