import React from 'react';
import * as Icons from './Icons';

const todayISO = () => new Date().toISOString().split('T')[0];

const dayDiff = (d1, d2) =>
  Math.floor((new Date(d2) - new Date(d1)) / (1000 * 60 * 60 * 24));

const HabitsPage = ({ 
  isDarkTheme, 
  habits, 
  setHabits,
  setShowAddHabit,
  handle3DMove,
  handle3DLeave,
  onExportHabits
}) => {
  const cardClasses = isDarkTheme
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
    : 'bg-white border-2 border-blue-200';

  /* ✅ DATE-BASED HABIT TOGGLE */
  const handleToggleHabit = (id) => {
    const today = todayISO();

    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;

      const lastDate = habit.lastCompletedDate;
      let newStreak = habit.streak || 0;

      if (!lastDate) {
        // First time completion
        newStreak = 1;
      } else {
        const diff = dayDiff(lastDate, today);

        if (diff === 0) {
          // Already completed today → no change
          return habit;
        } else if (diff === 1) {
          // Next day → continue streak
          newStreak += 1;
        } else {
          // Missed days → reset streak
          newStreak = 1;
        }
      }

      return {
        ...habit,
        completed: true,
        streak: newStreak,
        lastCompletedDate: today
      };
    }));
  };

  const handleDeleteHabit = (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter(habit => habit.id !== id));
    }
  };

  return (
    <div className="space-y-4 animate-slideIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">HABITS</h1>
        <div className="flex gap-2">
          <button
            onClick={() => onExportHabits('csv')}
            className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all"
          >
            <Icons.Download size={18} />
          </button>
          <button
            onClick={() => onExportHabits('txt')}
            className="p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-all"
          >
            <Icons.FileText size={18} />
          </button>
          <button
            onClick={() => setShowAddHabit(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-all hover:scale-105"
          >
            <Icons.Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Habits List */}
      {habits.length === 0 ? (
        <div className={`${cardClasses} p-12 rounded-2xl text-center`}>
          <Icons.Zap size={64} className="mx-auto mb-4 opacity-30" />
          <p className={`text-lg font-semibold ${isDarkTheme ? 'text-slate-400' : 'text-gray-500'}`}>
            No habits yet. Build your first habit!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map(habit => (
            <div
              key={habit.id}
              className={`${cardClasses} p-5 rounded-2xl shadow-lg card-3d animate-pulse-subtle transition-all`}
              onMouseMove={(e) => handle3DMove(e, 30)}
              onMouseLeave={handle3DLeave}
            >
              <div className="flex items-center gap-4">
                {/* Checkbox */}
                <button onClick={() => handleToggleHabit(habit.id)}>
                  <Icons.CheckCircle2
                    size={28}
                    className={
                      habit.lastCompletedDate === todayISO()
                        ? 'text-green-500'
                        : 'text-slate-500'
                    }
                  />
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1">
                    {habit.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    <span className={`text-sm font-semibold ${
                      habit.streak > 0
                        ? 'text-orange-500'
                        : isDarkTheme
                        ? 'text-slate-400'
                        : 'text-gray-500'
                    }`}>
                      {habit.streak || 0} day{habit.streak !== 1 ? 's' : ''} streak
                    </span>
                  </div>

                  {habit.lastCompletedDate && (
                    <p className={`text-xs mt-1 ${
                      isDarkTheme ? 'text-slate-500' : 'text-gray-500'
                    }`}>
                      Last done: {habit.lastCompletedDate}
                    </p>
                  )}
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDeleteHabit(habit.id)}
                  className="text-red-500 hover:bg-red-500/20 p-2 rounded-lg transition-all"
                >
                  <Icons.Trash2 size={16} />
                </button>
              </div>

              {/* Milestones */}
              {habit.streak >= 7 && habit.streak % 7 === 0 && (
                <div className="mt-3 bg-orange-500/20 text-orange-500 text-center py-2 rounded-xl font-bold text-sm">
                  🎉 {habit.streak / 7} week streak!
                </div>
              )}

              {habit.streak >= 30 && (
                <div className="mt-3 bg-purple-500/20 text-purple-500 text-center py-2 rounded-xl font-bold text-sm">
                  👑 30+ days! Habit mastered!
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitsPage;
                
