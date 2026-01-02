import React, { useState } from 'react';
import * as Icons from '../Icons';
import { generateId, getCurrentDate, getCurrentTime } from '../../utils/helpers';

const AddTaskModal = ({ isDarkTheme, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState(getCurrentDate());
  const [dueTime, setDueTime] = useState(getCurrentTime());
  const [reminder, setReminder] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter task title');
      return;
    }

    onAdd({
      id: generateId(),
      title: title.trim(),
      category,
      dueDate,
      dueTime,
      reminder,
      completed: false
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
          <h2 className="text-2xl font-black">Add Task</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <Icons.X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="block font-semibold mb-2">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none ${
                isDarkTheme
                  ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
              placeholder="e.g., Complete project report"
              autoFocus
            />
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
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block font-semibold mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none ${
                isDarkTheme
                  ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
            />
          </div>

          {/* Due Time */}
          <div>
            <label className="block font-semibold mb-2">Due Time</label>
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none ${
                isDarkTheme
                  ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
            />
          </div>

          {/* Reminder Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="reminder"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
              className="w-5 h-5 rounded"
            />
            <label htmlFor="reminder" className="font-semibold cursor-pointer flex items-center gap-2">
              <Icons.AlarmClock size={18} className="text-yellow-500" />
              Set reminder notification (5 min before)
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-105"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
