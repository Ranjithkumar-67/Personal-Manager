import React from 'react';
import * as Icons from '../Icons';
import { formatIndianRupee } from '../../utils/helpers';

const ResetDialog = ({ isDarkTheme, monthlySalary, onClose, onReset, onResetWithNewLimit }) => {
  const handleResetKeepLimit = () => {
    if (window.confirm('This will clear all your data but keep the current salary limit. Are you sure?')) {
      onReset();
      onClose();
    }
  };

  const handleResetNewLimit = () => {
    if (window.confirm('This will clear all your data and allow you to set a new salary limit. Are you sure?')) {
      onResetWithNewLimit();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-3xl p-6 ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700' 
          : 'bg-white border-2 border-blue-200'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">Reset Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <Icons.X size={24} />
          </button>
        </div>

        {/* Description */}
        <div className="space-y-4 mb-6">
          <p className={isDarkTheme ? 'text-slate-400' : 'text-gray-600'}>
            Choose how you want to reset your dashboard:
          </p>

          {/* Current Limit Display */}
          <div className={`p-4 rounded-xl ${
            isDarkTheme ? 'bg-blue-500/10' : 'bg-blue-50'
          }`}>
            <p className={`text-sm mb-1 ${isDarkTheme ? 'text-slate-400' : 'text-gray-600'}`}>
              Current Monthly Limit:
            </p>
            <p className="text-2xl font-black text-blue-500">
              {formatIndianRupee(monthlySalary)}
            </p>
          </div>

          {/* Warning Box */}
          <div className={`p-4 rounded-xl border-2 ${
            isDarkTheme 
              ? 'bg-red-500/10 border-red-500/30' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-xl">⚠️</span>
              <div>
                <p className={`text-sm font-semibold mb-1 ${isDarkTheme ? 'text-red-400' : 'text-red-700'}`}>
                  Warning
                </p>
                <p className={`text-xs ${isDarkTheme ? 'text-red-400/80' : 'text-red-600'}`}>
                  This action will permanently delete all your expenses, notes, tasks, goals, and habits. This cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Reset with Current Limit */}
          <button
            onClick={handleResetKeepLimit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Icons.RefreshCw size={20} />
            Reset with Current Limit
          </button>

          {/* Reset and Set New Limit */}
          <button
            onClick={handleResetNewLimit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Icons.Edit2 size={20} />
            Reset and Set New Limit
          </button>

          {/* Cancel */}
          <button
            onClick={onClose}
            className={`w-full font-bold py-4 rounded-xl transition-all ${
              isDarkTheme
                ? 'bg-slate-700 hover:bg-slate-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetDialog;
