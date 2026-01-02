import React from 'react';
import * as Icons from './Icons';
import { getGreeting, formatIndianRupee, getCurrentMonthName, getDayOfYear } from '../utils/helpers';
import { quotes, getCategoryIcon } from '../utils/constants';

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
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
    : 'bg-white border-2 border-blue-200';

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const todayExpenses = expenses
    .filter(e => e.date === new Date().toISOString().split('T')[0])
    .reduce((sum, e) => sum + e.amount, 0);
  
  const remaining = monthlyLimit - totalExpenses;
  const budgetProgress = Math.min((totalExpenses / monthlyLimit) * 100, 100);

  // Get recent expenses (last 3)
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Get daily quote
  const dailyQuote = quotes[getDayOfYear() % quotes.length];

  // SVG Circle progress
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (budgetProgress / 100) * circumference;

  return (
    <div className="space-y-4 animate-slideIn">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black mb-1">
            {getGreeting()} 👋
          </h1>
          <p className={isDarkTheme ? 'text-slate-400' : 'text-gray-600'}>
            Welcome, {displayName}
          </p>
        </div>
        <button
          onClick={() => setShowResetDialog(true)}
          className="bg-red-500/20 text-red-500 px-3 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-red-500/30 transition-all"
        >
          <Icons.RefreshCw size={16} />
          Reset
        </button>
      </div>

      {/* Balance Card */}
      <div
        className={`${cardClasses} p-6 rounded-2xl shadow-lg card-3d`}
        onMouseMove={(e) => handle3DMove(e, 20)}
        onMouseLeave={handle3DLeave}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className={`text-sm font-semibold ${isDarkTheme ? 'text-slate-400' : 'text-gray-600'}`}>
              Current Balance
            </p>
            <h2 className="text-4xl font-black mt-1">
              {formatIndianRupee(income - totalExpenses)}
            </h2>
          </div>
          <div className="bg-teal-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
            {getCurrentMonthName()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Icons.TrendingUp size={16} className="text-green-600" />
              <span className="text-xs font-semibold text-green-600">Income</span>
            </div>
            <p className="text-lg font-bold text-green-700">{formatIndianRupee(income)}</p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Icons.TrendingUp size={16} className="text-red-600 rotate-180" />
              <span className="text-xs font-semibold text-red-600">Expense</span>
            </div>
            <p className="text-lg font-bold text-red-700">{formatIndianRupee(totalExpenses)}</p>
          </div>
        </div>
      </div>

      {/* Budget Progress Card */}
      <div
        className={`${cardClasses} p-6 rounded-2xl shadow-lg card-3d`}
        onMouseMove={(e) => handle3DMove(e, 20)}
        onMouseLeave={handle3DLeave}
      >
        <h3 className="text-lg font-bold mb-4">Budget Progress</h3>
        
        <div className="flex items-center justify-center mb-4">
          <svg width="200" height="200" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke={isDarkTheme ? '#334155' : '#e5e7eb'}
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
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
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute text-center">
            <div className="text-4xl font-black text-blue-500">
              {Math.round(budgetProgress)}%
            </div>
            <div className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-gray-600'}`}>
              of {formatIndianRupee(monthlyLimit)}
            </div>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <div>
            <span className={isDarkTheme ? 'text-slate-400' : 'text-gray-600'}>Spent: </span>
            <span className="font-bold text-red-500">{formatIndianRupee(totalExpenses)}</span>
          </div>
          <div>
            <span className={isDarkTheme ? 'text-slate-400' : 'text-gray-600'}>Remaining: </span>
            <span className="font-bold text-green-500">{formatIndianRupee(Math.max(0, remaining))}</span>
          </div>
        </div>
      </div>

      {/* Today's Spending Card */}
      <div
        className={`${cardClasses} p-6 rounded-2xl shadow-lg card-3d`}
        onMouseMove={(e) => handle3DMove(e, 25)}
        onMouseLeave={handle3DLeave}
      >
        <h3 className="text-lg font-bold mb-4">Today's Spending</h3>
        
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-500/10 w-32 h-32 rounded-full flex items-center justify-center">
            <div className="text-center">
              <Icons.IndianRupee size={24} className="mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-black">{todayExpenses.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAddExpense(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Icons.Plus size={20} />
          Add Expense
        </button>
      </div>

      {/* Recent Expenses */}
      <div className={`${cardClasses} p-6 rounded-2xl shadow-lg`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Recent Expenses</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onExportExpenses('csv')}
              className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all"
              title="Export CSV"
            >
              <Icons.Download size={16} />
            </button>
            <button
              onClick={() => onExportExpenses('txt')}
              className="p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-all"
              title="Export TXT"
            >
              <Icons.FileText size={16} />
            </button>
          </div>
        </div>

        {recentExpenses.length === 0 ? (
          <p className={`text-center py-8 ${isDarkTheme ? 'text-slate-400' : 'text-gray-500'}`}>
            No expenses yet. Add your first expense!
          </p>
        ) : (
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  isDarkTheme ? 'bg-slate-800' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getCategoryIcon(expense.category)}</div>
                  <div>
                    <p className="font-semibold">{expense.title}</p>
                    <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-gray-500'}`}>
                      {new Date(expense.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-red-500">
                  -{formatIndianRupee(expense.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Daily Quote Card */}
      <div
        className={`${cardClasses} p-6 rounded-2xl shadow-lg card-3d`}
        onMouseMove={(e) => handle3DMove(e, 30)}
        onMouseLeave={handle3DLeave}
      >
        <div className="flex items-start gap-3">
          <Icons.Sparkles size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
          <p className="italic text-center flex-1">
            "{dailyQuote}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
