import React, { useState } from 'react';
import * as Icons from '../Icons';
import { expenseCategories } from '../../utils/constants';
import { generateId, getCurrentDate } from '../../utils/helpers';

const AddExpenseModal = ({ isDarkTheme, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !amount || !category) {
      alert('Please fill all fields');
      return;
    }

    const finalCategory = category === 'Custom' && customCategory 
      ? `Others-${customCategory}` 
      : category;

    onAdd({
      id: generateId(),
      title: title.trim(),
      amount: parseFloat(amount),
      category: finalCategory,
      date: getCurrentDate()
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
          <h2 className="text-2xl font-black">Add Expense</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <Icons.X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none ${
                isDarkTheme
                  ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
              placeholder="e.g., Breakfast"
              autoFocus
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block font-semibold mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none ${
                  isDarkTheme
                    ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                    : 'bg-white border-gray-300 focus:border-blue-500'
                }`}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none ${
                isDarkTheme
                  ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
            >
              <option value="">Select Category</option>
              {Object.entries(expenseCategories).map(([groupName, items]) => (
                <optgroup key={groupName} label={groupName}>
                  {items.map((item) => (
                    <option key={item.value} value={`${groupName}-${item.value}`}>
                      {item.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Custom Category Input */}
          {category === 'Others-Custom' && (
            <div>
              <label className="block font-semibold mb-2">Custom Category Name</label>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none ${
                  isDarkTheme
                    ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                    : 'bg-white border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter custom category"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-105"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;
