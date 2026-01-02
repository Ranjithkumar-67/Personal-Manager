import React, { useState } from 'react';
import * as Icons from '../Icons';
import { generateId } from '../../utils/helpers';

const AddHabitModal = ({ isDarkTheme, onClose, onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter habit title');
      return;
    }

    onAdd({
      id: generateId(),
      title: title.trim(),
      completed: false,
      streak: 0
    });

    onClose();
  };

  // Suggested habits
  const suggestions = [
    'Morning Exercise',
    'Drink 8 glasses of water',
    'Read for 30 minutes',
    'Meditate for 10 minutes',
    'Write a journal entry',
    'Practice coding',
    'Learn something new',
    'Go for a walk'
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-3xl p-6 max-h-[90vh] overflow-y-auto ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700' 
          : 'bg-white border-2 border-blue-200'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">Add Habit</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <Icons.X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Habit Title */}
          <div>
            <label className="block font-semibold mb-2">Habit Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none ${
                isDarkTheme
                  ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
              placeholder="e.g., Morning Exercise"
              autoFocus
            />
          </div>

          {/* Suggestions */}
          <div>
            <label className="block font-semibold mb-2">💡 Suggestions</label>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setTitle(suggestion)}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    isDarkTheme
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Info Text */}
          <div className={`p-4 rounded-xl ${
            isDarkTheme ? 'bg-orange-500/10' : 'bg-orange-50'
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <p className={`text-sm font-semibold mb-1 ${isDarkTheme ? 'text-orange-400' : 'text-orange-700'}`}>
                  Build Your Streak!
                </p>
                <p className={`text-xs ${isDarkTheme ? 'text-orange-400/80' : 'text-orange-600'}`}>
                  Complete your habit daily to build and maintain your streak. The longer your streak, the stronger your habit!
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-105"
          >
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;
