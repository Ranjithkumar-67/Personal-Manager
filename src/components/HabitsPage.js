import React from 'react';
import * as Icons from './Icons';

/* =========================
   DATE HELPERS
========================= */
const getToday = () => new Date().toISOString().split('T')[0];

const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

/* =========================
   STREAK CALCULATION
   (calendar-based)
========================= */
const calculateStreak = (dates = []) => {
  if (!dates.length) return 0;

  const sorted = [...dates].sort();
  let streak = 1;

  for (let i = sorted.length - 1; i > 0; i--) {
    const curr = new Date(sorted[i]);
    const prev = new Date(sorted[i - 1]);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);

    if (diff === 1) streak++;
    else break;
  }

  return streak;
};

const HabitsPage = ({ 
  isDarkTheme, 
  habits, 
  setHabits,
  setShowAddHabit,
  handle3DMove,
  handle3DLeave,
  onExportHabits
}) => {

  const today = getToday();

  const cardClasses = isDarkTheme
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
    : 'bg-white border-2 border-blue-200';

  /* =========================
     TOGGLE HABIT (FIXED)
     - One completion per day
     - Calendar-based streak
     - Same-day toggle safe
  ========================= */
  const handleToggleHabit = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;

      const completedDates = habit.completedDates || [];
      const hasCompletedToday = completedDates.includes(today);

      /* ❌ Uncheck today → remove today only */
      if (hasCompletedToday) {
        const newDates = completedDates.filter(d => d !== today);

        return {
          ...habit,
          completedDates: newDates,
          lastCompletedDate: newDates[newDates.length - 1] || null,
          streak: calculateStreak(newDates)
        };
      }

      /* ✅ First completion today */
      const yesterday = getYesterday();
      const isConsecutive = habit.lastCompletedDate === yesterday;

      return {
        ...habit,
        completedDates: [...completedDates, today],
        lastCompletedDate: today,
        streak: isConsecutive ? habit.streak + 1 : 1
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

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">HABITS</h1>
        <div className="flex gap-2">
          <button
            onClick={() => onExportHabits('csv')}
            className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all"
            title="Export CSV"
          >
            <Icons.Download size={18} />
          </button>

          <button
            onClick={() => onExportHabits('txt')}
            className="p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-all"
            title="Export TXT"
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

      {/* HABITS LIST */}
      {habits.length === 0 ? (
        <div className={`${cardClasses} p-12 rounded-2xl text-center`}>
          <Icons.Zap size={64} className="mx-auto mb-4 opacity-30" />
          <p className={`text-lg font-semibold ${isDarkTheme ? 'text-slate-400' : 'text-gray-500'}`}>
            No habits yet. Build your first habit!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => {
            const completedToday = (habit.completedDates || []).includes(today);

            return (
              <div
                key={habit.id}
                className={`${cardClasses} p-5 rounded-2xl shadow-lg card-3d animate-pulse-subtle transition-all`}
                onMouseMove={(e) => handle3DMove(e, 30)}
                onMouseLeave={handle3DLeave}
              >
                <div className="flex items-center gap-4">

                  {/* CHECKBOX */}
                  <button
                    onClick={() => handleToggleHabit(habit.id)}
                    className="flex-shrink-0"
                  >
                    {completedToday ? (
                      <Icons.CheckCircle2 size={28} className="text-green-500" />
                    ) : (
                      <Icons.Circle size={28} className="text-slate-600" />
                    )}
                  </button>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-lg mb-1 ${
                      completedToday ? 'line-through opacity-70' : ''
                    }`}>
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
                        {habit.streak} day{habit.streak !== 1 ? 's' : ''} streak
                      </span>
                    </div>
                  </div>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="text-red-500 hover:bg-red-500/20 p-2 rounded-lg transition-all flex-shrink-0"
                  >
                    <Icons.Trash2 size={16} />
                  </button>
                </div>

                {/* STREAK MILESTONES */}
                {habit.streak >= 7 && habit.streak % 7 === 0 && (
                  <div className="mt-3 bg-orange-500/20 text-orange-500 text-center py-2 rounded-xl font-bold text-sm">
                    🎉 {habit.streak / 7} week{habit.streak !== 7 ? 's' : ''} streak!
                  </div>
                )}

                {habit.streak >= 30 && (
                  <div className="mt-3 bg-purple-500/20 text-purple-500 text-center py-2 rounded-xl font-bold text-sm">
                    👑 1 month+ streak! Amazing!
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HabitsPage;
