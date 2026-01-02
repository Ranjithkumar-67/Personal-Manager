import React, { useState } from 'react';
import * as Icons from '../Icons';
import { noteEmojis } from '../../utils/constants';
import { generateId, getCurrentDate } from '../../utils/helpers';

const AddNoteModal = ({ isDarkTheme, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal');
  const [selectedIcon, setSelectedIcon] = useState('📝');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill all fields');
      return;
    }

    onAdd({
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      category,
      icon: selectedIcon,
      date: getCurrentDate()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-3xl p-6 max-h-[90vh] overflow-y-auto ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700' 
          : 'bg-white border-2 border-blue-200'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">Add Note</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <Icons.X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Emoji Picker */}
          <div>
            <label className="block font-semibold mb-2">Select Icon</label>
            <div className="grid grid-cols-6 gap-2">
              {noteEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedIcon(emoji)}
                  className={`text-2xl p-3 rounded-xl transition-all ${
                    selectedIcon === emoji
                      ? 'bg-blue-500/20 scale-110'
                      : isDarkTheme
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

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
              placeholder="Note title"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-semibold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none resize-none ${
                isDarkTheme
                  ? 'bg-slate-700 border-slate-600 focus:border-blue-500'
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Write your note here..."
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
              <option value="Personal">Personal</option>
              <option value="Official">Official</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-105"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
