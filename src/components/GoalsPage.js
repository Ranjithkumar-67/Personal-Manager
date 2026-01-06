import React from 'react';
import * as Icons from './Icons';
import { clamp } from '../utils/helpers';

const MAX_PROGRESS = 99;

const GoalsPage = ({ 
  isDarkTheme, 
  goals, 
  setGoals,
  setShowAddGoal,
  handle3DMove,
  handle3DLeave,
  onExportGoals
}) => {
  const cardClasses = isDarkTheme
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
    : 'bg-white border-2 border-blue-200';

  const handleUpdateProgress = (id, change) => {
    setGoals(
      goals.map(goal =>
        goal.id === id
          ? {
              ...goal,
              progress: clamp(goal.progress + change, 0, MAX_PROGRESS)
            }
          : goal
      )
    );
  };

  const handleDeleteGoal = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(goal => goal.id !== id));
    }
  };

  return (
    <div className="space-y-4 animate-slideIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">GOALS</h1>
        <div className="flex gap-2">
          <button
            onClick={() => onExportGoals('csv')}
            className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all"
            title="Export CSV"
          >
            <Icons.Download size={18} />
          </button>
          <button
            onClick={() => onExportGoals('txt')}
            className="p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-all"
            title="Export TXT"
          >
            <Icons.FileText size={18} />
          </button>
          <button
            onClick={() => setShowAddGoal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-700 transition-all hover:scale-105"
          >
            <Icons.Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className={`${cardClasses} p-12 rounded-2xl text-center`}>
          <Icons.Target size={64} className="mx-auto mb-4 opacity-30" />
          <p className={`text-lg font-semibold ${isDarkTheme ? 'text-slate-400' : 'text-gray-500'}`}>
            No goals yet. Set your first goal!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map(goal => (
            <div
              key={goal.id}
              className={`${cardClasses} p-6 rounded-2xl shadow-lg card-3d hover:shadow-2xl transition-all`}
              onMouseMove={(e) => handle3DMove(e, 25)}
              onMouseLeave={handle3DLeave}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-lg flex-1">{goal.title}</h3>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-red-500 hover:bg-red-500/20 p-2 rounded-lg transition-all"
                >
                  <Icons.Trash2 size={16} />
                </button>
              </div>

              {/* Progress Percentage */}
              <div className="text-center mb-3">
                <span className="text-2xl font-black text-blue-400">
                  {goal.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className={`w-full h-3 rounded-full mb-4 ${
                isDarkTheme ? 'bg-slate-700' : 'bg-gray-200'
              }`}>
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateProgress(goal.id, -10)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    isDarkTheme 
                      ? 'bg-slate-700 hover:bg-slate-600' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  disabled={goal.progress === 0}
                >
                  -10%
                </button>

                <button
                  onClick={() => handleUpdateProgress(goal.id, 10)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all"
                  disabled={goal.progress >= MAX_PROGRESS}
                >
                  +10%
                </button>
              </div>

              {/* Completed Badge */}
              {goal.progress === MAX_PROGRESS && (
                <div className="mt-3 bg-green-500/20 text-green-500 text-center py-2 rounded-xl font-bold text-sm">
                  🎯 Goal Completed (99%)
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsPage;

