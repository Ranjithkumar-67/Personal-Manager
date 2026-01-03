import React, { useEffect, useState } from 'react';
import * as Icons from './Icons';
import {
  getGreeting,
  formatIndianRupee,
  getCurrentMonthName,
  getDayOfYear
} from '../utils/helpers';
import { quotes, getCategoryIcon } from '../utils/constants';

/* ---------------- Animated Percentage ---------------- */
const AnimatedPercentage = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const stepTime = 16;
    const increment = value / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setDisplayValue(Math.round(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl font-black text-blue-600 dark:text-blue-400">
      {displayValue}%
    </span>
  );
};

/* ---------------- Home Page ---------------- */
const HomePage = ({
  isDarkTheme,
  displayName,
  expenses,
  income,
  monthlyLimit,
  setShowResetDialog,
  setShowAddExpense,
  handle3DMove,
  handle3DLeave,
  onExportExpenses
}) => {
  const cardClasses = isDarkTheme
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 text-white'
    : 'bg-white border-2 border-blue-200 text-slate-900';

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const todayExpenses = expenses
    .filter(e => e.date === new Date().toISOString().split('T')[0])
    .reduce((sum, e) => sum + e.amount, 0);

  const remaining = monthlyLimit - totalExpenses;
  const budgetProgress = Math.min((totalExpenses / monthlyLimit) * 100, 100);

  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const dailyQuote = quotes[getDayOfYear() % quotes.length];

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (budgetProgress / 100) * circumference;

  return (
    <div className="space-y-4 animate-slideIn">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {getGreeting()} 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Welcome, {displayName}
          </p>
        </div>

        <button
          onClick={() => setShowResetDialog(true)}
          className="bg-red-500/20 text-red-600 dark:text-red-400 px-3 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-red-500/30 transition-all"
        >
          <Icons.RefreshCw size={16} />
          Reset
        </button>
      </div>

      {/* BALANCE */}
      <div
        className={`${cardClasses} p-6 rounded-2xl shadow-lg card-3d`}
        onMouseMove={(e) => handle3DMove(e, 20)}
        onMouseLeave={handle3DLeave}
      >
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Current Balance
        </p>

        <h2 className="text-4xl font-black mt-1">
          {formatIndianRupee(income - totalExpenses)}
        </h2>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
            <p className="text-xs font-semibold text-green-700 dark:text-green-300">
              Income
            </p>
            <p className="text-lg font-bold">
              {formatIndianRupee(income)}
            </p>
          </div>

          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
            <p className="text-xs font-semibold text-red-700 dark:text-red-300">
              Expense
            </p>
            <p className="text-lg font-bold">
              {formatIndianRupee(totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      {/* BUDGET PROGRESS */}
      <div className={`${cardClasses} p-6 rounded-2xl shadow-lg`}>
        <h3 className="text-lg font-bold mb-4">Budget Progress</h3>

        <div className="flex justify-center relative">
          <svg width="200" height="200" className="-rotate-90">
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#334155"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#3b82f6"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm rounded-full">
            <AnimatedPercentage value={Math.round(budgetProgress)} />
            <span className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
              of {formatIndianRupee(monthlyLimit)}
            </span>
          </div>
        </div>

        <div className="flex justify-between mt-4 text-sm">
          <span className="text-red-500 font-semibold">
            Spent: {formatIndianRupee(totalExpenses)}
          </span>
          <span className="text-green-500 font-semibold">
            Remaining: {formatIndianRupee(Math.max(0, remaining))}
          </span>
        </div>
      </div>

      {/* TODAY */}
      <div className={`${cardClasses} p-6 rounded-2xl shadow-lg`}>
        <h3 className="text-lg font-bold mb-4">Today's Spending</h3>

        <p className="text-2xl font-black text-center">
          {todayExpenses.toLocaleString('en-IN')}
        </p>

        <button
          onClick={() => setShowAddExpense(true)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl"
        >
          Add Expense
        </button>
      </div>

      {/* RECENT EXPENSES */}
      <div className={`${cardClasses} p-6 rounded-2xl shadow-lg`}>
        <h3 className="text-lg font-bold mb-4">Recent Expenses</h3>

        {recentExpenses.length === 0 ? (
          <p className="text-center text-slate-600 dark:text-slate-400">
            No expenses yet
          </p>
        ) : (
          recentExpenses.map(e => (
            <div key={e.id} className="flex justify-between py-2">
              <span className="text-slate-700 dark:text-slate-200">
                {getCategoryIcon(e.category)} {e.title}
              </span>
              <span className="font-bold text-red-400">
                -{formatIndianRupee(e.amount)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* QUOTE */}
      <div className={`${cardClasses} p-6 rounded-2xl shadow-lg`}>
        <p className="italic text-center text-slate-700 dark:text-slate-300">
          "{dailyQuote}"
        </p>
      </div>
    </div>
  );
};

export default HomePage;
