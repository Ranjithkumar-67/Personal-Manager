import React, { useState, useEffect } from 'react';
import './App.css';

// Pages & Components
import LoginScreen from './components/LoginScreen';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import NotesPage from './components/NotesPage';
import TasksPage from './components/TasksPage';
import GoalsPage from './components/GoalsPage';
import HabitsPage from './components/HabitsPage';
import SettingsPage from './components/SettingsPage';

// Modals
import AddExpenseModal from './components/Modals/AddExpenseModal';
import AddNoteModal from './components/Modals/AddNoteModal';
import AddTaskModal from './components/Modals/AddTaskModal';
import AddGoalModal from './components/Modals/AddGoalModal';
import AddHabitModal from './components/Modals/AddHabitModal';
import ResetDialog from './components/Modals/ResetDialog';

// Utils
import { STORAGE_KEYS, defaultSettings } from './utils/constants';
import { checkNotificationPermission, showNotification } from './utils/helpers';
import {
  exportExpenses,
  exportNotes,
  exportTasks,
  exportGoals,
  exportHabits
} from './utils/exportUtils';

function App() {
  /* ---------------- AUTH ---------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [displayName, setDisplayName] = useState('User');

  /* ---------------- UI ---------------- */
  const [page, setPage] = useState('home');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  /* ---------------- DATA ---------------- */
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([]);
  const [expenses, setExpenses] = useState([]);

  /* ---------------- SETTINGS ---------------- */
  const [monthlySalary, setMonthlySalary] = useState(defaultSettings.monthlySalary);
  const [monthlyLimit, setMonthlyLimit] = useState(defaultSettings.monthlyLimit);
  const [income, setIncome] = useState(defaultSettings.income);

  /* ---------------- MODALS ---------------- */
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  /* ---------------- LOAD LOCAL STORAGE ---------------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme !== null) setIsDarkTheme(savedTheme === 'true');

    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUserId(u.userId);
      setDisplayName(u.displayName || 'User');
      setPage('home'); // 🔑 CRITICAL
    }

    setNotes(JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '[]'));
    setTasks(JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]'));
    setGoals(JSON.parse(localStorage.getItem(STORAGE_KEYS.GOALS) || '[]'));
    setHabits(JSON.parse(localStorage.getItem(STORAGE_KEYS.HABITS) || '[]'));
    setExpenses(JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPENSES) || '[]'));

    const settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}');
    setMonthlySalary(settings.monthlySalary || defaultSettings.monthlySalary);
    setMonthlyLimit(settings.monthlyLimit || defaultSettings.monthlyLimit);
    setIncome(settings.income || defaultSettings.income);

    checkNotificationPermission();
  }, []);

  /* ---------------- SAVE LOCAL STORAGE ---------------- */
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify({ userId, displayName })
      );
    }
  }, [isLoggedIn, userId, displayName]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SETTINGS,
      JSON.stringify({ monthlySalary, monthlyLimit, income })
    );
  }, [monthlySalary, monthlyLimit, income]);

  /* ---------------- CLOCK ---------------- */
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* ---------------- LOGIN ---------------- */
  const handleLogin = (uid, pin) => {
    setUserId(uid);
    setIsLoggedIn(true);
    setPage('home'); // 🔥 THIS FIXES WHITE SCREEN
    localStorage.setItem(STORAGE_KEYS.LOGIN_DATE, new Date().toISOString());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId('');
    setDisplayName('User');
    setPage('home');
    localStorage.clear();
  };

  /* ---------------- EXPORT ---------------- */
  const handleExportExpenses = f => exportExpenses(expenses, f);
  const handleExportNotes = f => exportNotes(notes, f);
  const handleExportTasks = f => exportTasks(tasks, f);
  const handleExportGoals = f => exportGoals(goals, f);
  const handleExportHabits = f => exportHabits(habits, f);

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  /* ---------------- THEME ---------------- */
  const themeClasses = isDarkTheme
    ? 'bg-slate-900 text-white'
    : 'bg-slate-100 text-gray-900';

  return (
    <div
      className={`min-h-screen ${themeClasses}`}
      style={{ backgroundColor: isDarkTheme ? '#020617' : '#f8fafc' }}
    >
      <Navigation
        currentPage={page}
        setPage={setPage}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        currentTime={currentTime}
        displayName={displayName}
      />

      <div className="max-w-md mx-auto pt-20 pb-28 px-4">
        {page === 'home' && (
          <HomePage
            expenses={expenses}
            income={income}
            monthlyLimit={monthlyLimit}
            setShowAddExpense={setShowAddExpense}
            setShowResetDialog={setShowResetDialog}
            onExportExpenses={handleExportExpenses}
          />
        )}

        {page === 'notes' && (
          <NotesPage
            notes={notes}
            setNotes={setNotes}
            setShowAddNote={setShowAddNote}
            onExportNotes={handleExportNotes}
          />
        )}

        {page === 'tasks' && (
          <TasksPage
            tasks={tasks}
            setTasks={setTasks}
            setShowAddTask={setShowAddTask}
            onExportTasks={handleExportTasks}
          />
        )}

        {page === 'goals' && (
          <GoalsPage
            goals={goals}
            setGoals={setGoals}
            setShowAddGoal={setShowAddGoal}
            onExportGoals={handleExportGoals}
          />
        )}

        {page === 'habits' && (
          <HabitsPage
            habits={habits}
            setHabits={setHabits}
            setShowAddHabit={setShowAddHabit}
            onExportHabits={handleExportHabits}
          />
        )}

        {page === 'settings' && (
          <SettingsPage
            displayName={displayName}
            setDisplayName={setDisplayName}
            monthlySalary={monthlySalary}
            setMonthlySalary={setMonthlySalary}
            setMonthlyLimit={setMonthlyLimit}
            setIncome={setIncome}
            userId={userId}
            onLogout={handleLogout}
          />
        )}

        {/* Fallback — NEVER white screen again */}
        {!['home','notes','tasks','goals','habits','settings'].includes(page) && (
          <div className="text-center mt-10">Loading...</div>
        )}
      </div>

      {/* Modals */}
      {showAddExpense && (
        <AddExpenseModal
          onClose={() => setShowAddExpense(false)}
          onAdd={e => setExpenses([...expenses, e])}
        />
      )}

      {showAddNote && (
        <AddNoteModal
          onClose={() => setShowAddNote(false)}
          onAdd={n => setNotes([...notes, n])}
        />
      )}

      {showAddTask && (
        <AddTaskModal
          onClose={() => setShowAddTask(false)}
          onAdd={t => setTasks([...tasks, t])}
        />
      )}

      {showAddGoal && (
        <AddGoalModal
          onClose={() => setShowAddGoal(false)}
          onAdd={g => setGoals([...goals, g])}
        />
      )}

      {showAddHabit && (
        <AddHabitModal
          onClose={() => setShowAddHabit(false)}
          onAdd={h => setHabits([...habits, h])}
        />
      )}

      {showResetDialog && (
        <ResetDialog
          monthlySalary={monthlySalary}
          onClose={() => setShowResetDialog(false)}
          onReset={() => {
            setExpenses([]);
            setNotes([]);
            setTasks([]);
            setGoals([]);
            setHabits([]);
          }}
        />
      )}
    </div>
  );
}

export default App;
