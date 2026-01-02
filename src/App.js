import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import LoginScreen from './components/LoginScreen';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import NotesPage from './components/NotesPage';
import TasksPage from './components/TasksPage';
import GoalsPage from './components/GoalsPage';
import HabitsPage from './components/HabitsPage';
import SettingsPage from './components/SettingsPage';

// Modals - FIXED: Added components/ to path
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
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [displayName, setDisplayName] = useState('User');

  // UI State
  const [page, setPage] = useState('home');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Data State
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Settings State
  const [monthlySalary, setMonthlySalary] = useState(defaultSettings.monthlySalary);
  const [monthlyLimit, setMonthlyLimit] = useState(defaultSettings.monthlyLimit);
  const [income, setIncome] = useState(defaultSettings.income);

  // Modal States
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme !== null) setIsDarkTheme(savedTheme === 'true');

    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUserId(userData.userId);
      setDisplayName(userData.displayName || 'User');
    }

    const savedNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (savedNotes) setNotes(JSON.parse(savedNotes));

    const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (savedTasks) setTasks(JSON.parse(savedTasks));

    const savedGoals = localStorage.getItem(STORAGE_KEYS.GOALS);
    if (savedGoals) setGoals(JSON.parse(savedGoals));

    const savedHabits = localStorage.getItem(STORAGE_KEYS.HABITS);
    if (savedHabits) setHabits(JSON.parse(savedHabits));

    const savedExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));

    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setMonthlySalary(settings.monthlySalary || defaultSettings.monthlySalary);
      setMonthlyLimit(settings.monthlyLimit || defaultSettings.monthlyLimit);
      setIncome(settings.income || defaultSettings.income);
    }

    // Request notification permission
    checkNotificationPermission();
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ userId, displayName }));
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
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      monthlySalary,
      monthlyLimit,
      income
    }));
  }, [monthlySalary, monthlyLimit, income]);

  // Clock update every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check for task reminders every minute
  useEffect(() => {
    const checkReminders = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.reminder && !task.completed) {
          const dueTime = new Date(`${task.dueDate} ${task.dueTime}`);
          const timeDiff = dueTime - now;
          
          // Notify 5 minutes before
          if (timeDiff > 0 && timeDiff <= 300000 && timeDiff > 240000) {
            showNotification('Task Reminder', `${task.title} is due in 5 minutes!`, '📋');
          }
        }
      });
    }, 60000); // Check every minute
    
    return () => clearInterval(checkReminders);
  }, [tasks]);

  // Login handler
  const handleLogin = (uid, pin) => {
    setUserId(uid);
    setIsLoggedIn(true);
    
    // Save login date
    if (!localStorage.getItem(STORAGE_KEYS.LOGIN_DATE)) {
      localStorage.setItem(STORAGE_KEYS.LOGIN_DATE, new Date().toISOString());
    }
  };

  // Logout handler
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
      setUserId('');
      setDisplayName('User');
      setPage('home');
    }
  };

  // Reset handlers
  const handleReset = () => {
    setExpenses([]);
    setNotes([]);
    setTasks([]);
    setGoals([]);
    setHabits([]);
    setIncome(monthlySalary);
  };

  const handleResetWithNewLimit = () => {
    setExpenses([]);
    setNotes([]);
    setTasks([]);
    setGoals([]);
    setHabits([]);
    // Redirect to settings to edit salary
    setPage('settings');
  };

  // 3D Card Effect Handlers
  const handle3DMove = (e, divisor = 20) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / divisor;
    const rotateY = (centerX - x) / divisor;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handle3DLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  };

  // Export handlers
  const handleExportExpenses = (format) => {
    exportExpenses(expenses, format);
  };

  const handleExportNotes = (format) => {
    exportNotes(notes, format);
  };

  const handleExportTasks = (format) => {
    exportTasks(tasks, format);
  };

  const handleExportGoals = (format) => {
    exportGoals(goals, format);
  };

  const handleExportHabits = (format) => {
    exportHabits(habits, format);
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Theme classes
  const themeClasses = isDarkTheme
    ? 'bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 text-white'
    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
      {/* Navigation */}
      <Navigation
        currentPage={page}
        setPage={setPage}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        currentTime={currentTime}
        displayName={displayName}
      />

      {/* Main Content */}
      <div className="max-w-md mx-auto pt-20 pb-28 px-4">
        {page === 'home' && (
          <HomePage
            isDarkTheme={isDarkTheme}
            displayName={displayName}
            expenses={expenses}
            income={income}
            monthlyLimit={monthlyLimit}
            setShowResetDialog={setShowResetDialog}
            setShowAddExpense={setShowAddExpense}
            handle3DMove={handle3DMove}
            handle3DLeave={handle3DLeave}
            onExportExpenses={handleExportExpenses}
          />
        )}

        {page === 'notes' && (
          <NotesPage
            isDarkTheme={isDarkTheme}
            notes={notes}
            setNotes={setNotes}
            setShowAddNote={setShowAddNote}
            handle3DMove={handle3DMove}
            handle3DLeave={handle3DLeave}
            onExportNotes={handleExportNotes}
          />
        )}

        {page === 'tasks' && (
          <TasksPage
            isDarkTheme={isDarkTheme}
            tasks={tasks}
            setTasks={setTasks}
            setShowAddTask={setShowAddTask}
            handle3DMove={handle3DMove}
            handle3DLeave={handle3DLeave}
            onExportTasks={handleExportTasks}
          />
        )}

        {page === 'goals' && (
          <GoalsPage
            isDarkTheme={isDarkTheme}
            goals={goals}
            setGoals={setGoals}
            setShowAddGoal={setShowAddGoal}
            handle3DMove={handle3DMove}
            handle3DLeave={handle3DLeave}
            onExportGoals={handleExportGoals}
          />
        )}

        {page === 'habits' && (
          <HabitsPage
            isDarkTheme={isDarkTheme}
            habits={habits}
            setHabits={setHabits}
            setShowAddHabit={setShowAddHabit}
            handle3DMove={handle3DMove}
            handle3DLeave={handle3DLeave}
            onExportHabits={handleExportHabits}
          />
        )}

        {page === 'settings' && (
          <SettingsPage
            isDarkTheme={isDarkTheme}
            displayName={displayName}
            setDisplayName={setDisplayName}
            monthlySalary={monthlySalary}
            setMonthlySalary={setMonthlySalary}
            setMonthlyLimit={setMonthlyLimit}
            setIncome={setIncome}
            userId={userId}
            onLogout={handleLogout}
            handle3DMove={handle3DMove}
            handle3DLeave={handle3DLeave}
          />
        )}
      </div>

      {/* Modals */}
      {showAddExpense && (
        <AddExpenseModal
          isDarkTheme={isDarkTheme}
          onClose={() => setShowAddExpense(false)}
          onAdd={(expense) => setExpenses([...expenses, expense])}
        />
      )}

      {showAddNote && (
        <AddNoteModal
          isDarkTheme={isDarkTheme}
          onClose={() => setShowAddNote(false)}
          onAdd={(note) => setNotes([...notes, note])}
        />
      )}

      {showAddTask && (
        <AddTaskModal
          isDarkTheme={isDarkTheme}
          onClose={() => setShowAddTask(false)}
          onAdd={(task) => setTasks([...tasks, task])}
        />
      )}

      {showAddGoal && (
        <AddGoalModal
          isDarkTheme={isDarkTheme}
          onClose={() => setShowAddGoal(false)}
          onAdd={(goal) => setGoals([...goals, goal])}
        />
      )}

      {showAddHabit && (
        <AddHabitModal
          isDarkTheme={isDarkTheme}
          onClose={() => setShowAddHabit(false)}
          onAdd={(habit) => setHabits([...habits, habit])}
        />
      )}

      {showResetDialog && (
        <ResetDialog
          isDarkTheme={isDarkTheme}
          monthlySalary={monthlySalary}
          onClose={() => setShowResetDialog(false)}
          onReset={handleReset}
          onResetWithNewLimit={handleResetWithNewLimit}
        />
      )}
    </div>
  );
}

export default App;
