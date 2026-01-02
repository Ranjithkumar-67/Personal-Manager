import React from 'react';
import * as Icons from './Icons';
import { formatDate } from '../utils/helpers';

const NotesPage = ({ 
  isDarkTheme, 
  notes, 
  setNotes,
  setShowAddNote,
  handle3DMove,
  handle3DLeave,
  onExportNotes
}) => {
  const cardClasses = isDarkTheme
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
    : 'bg-white border-2 border-blue-200';

  const handleDeleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  return (
    <div className="space-y-4 animate-slideIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">Notes</h1>
        <div className="flex gap-2">
          <button
            onClick={() => onExportNotes('csv')}
            className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all"
            title="Export CSV"
          >
            <Icons.Download size={18} />
          </button>
          <button
            onClick={() => onExportNotes('txt')}
            className="p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-all"
            title="Export TXT"
          >
            <Icons.FileText size={18} />
          </button>
          <button
            onClick={() => setShowAddNote(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-700 transition-all hover:scale-105"
          >
            <Icons.Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className={`${cardClasses} p-12 rounded-2xl text-center`}>
          <Icons.StickyNote size={64} className="mx-auto mb-4 opacity-30" />
          <p className={`text-lg font-semibold ${isDarkTheme ? 'text-slate-400' : 'text-gray-500'}`}>
            No notes yet. Create your first note!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`${cardClasses} p-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all card-3d`}
              onMouseMove={(e) => handle3DMove(e, 30)}
              onMouseLeave={handle3DLeave}
            >
              <div className="flex items-start gap-4">
                {/* Emoji Icon */}
                <div className="text-2xl flex-shrink-0">{note.icon}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg">{note.title}</h3>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-500 hover:bg-red-500/20 p-2 rounded-lg transition-all flex-shrink-0"
                    >
                      <Icons.Trash2 size={16} />
                    </button>
                  </div>

                  <p className={`text-sm mb-3 ${isDarkTheme ? 'text-slate-400' : 'text-gray-600'}`}>
                    {note.content}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Category Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      note.category === 'Official'
                        ? 'bg-blue-500/20 text-blue-500'
                        : 'bg-green-500/20 text-green-500'
                    }`}>
                      {note.category}
                    </span>

                    {/* Date */}
                    <span className={`text-xs ${isDarkTheme ? 'text-slate-500' : 'text-gray-500'}`}>
                      {formatDate(note.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
