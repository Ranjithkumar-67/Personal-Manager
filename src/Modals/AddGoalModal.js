import React, { useState } from 'react';
import * as Icons from '../Icons';
import { generateId } from '../../utils/helpers';

const AddGoalModal = ({ isDarkTheme, onClose, onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter goal title');
      return;
    }

    onAdd({
      id: generateId(),
      title: title.trim(),
      progress: 0
    });

    onClose();
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
          <h2 className="text-2xl font-black">Add Goal</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <Icons.X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Goal Title */}
          <div>
            <label className="block font-semibold mb-2">Goal Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none ${
                isDarkTheme
                  ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
              placeholder="e.g., Read 12 books this year"
              autoFocus
            />
          </div>

          {/* Info Text */}
          <div className={`p-4 rounded-xl ${
            isDarkTheme ? 'bg-blue-500/10' : 'bg-blue-50'
          }`}>
            <p className={`text-sm ${isDarkTheme ? 'text-blue-400' : 'text-blue-700'}`}>
              💡 <strong>Tip:</strong> You can track your progress using +10% and -10% buttons after adding the goal.
            </p>
          </div>

          {/* Progress Preview */}
          <div className="text-center">
            <p className={`text-sm mb-2 ${isDarkTheme ? 'text-slate-400' : 'text-gray-600'}`}>
              Initial Progress
            </p>
            <div className="text-4xl font-black text-blue-500">0%</div>
            <div className={`w-full h-3 rounded-full mt-3 ${
              isDarkTheme ? 'bg-slate-700' : 'bg-gray-200'
            }`}>
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '0%' }} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-105"
          >
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;
