// Motivational Quotes Array
export const quotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don't stop when you're tired. Stop when you're done."
];

// Expense Categories
export const expenseCategories = {
  Food: [
    { value: 'Morning', label: '☕ Morning', icon: '☕', color: 'yellow-500' },
    { value: 'Afternoon', label: '🌅 Afternoon', icon: '🌅', color: 'orange-500' },
    { value: 'Night', label: '🌙 Night', icon: '🌙', color: 'blue-500' }
  ],
  Transport: [
    { value: 'Train', label: '🚂 Train', icon: '🚂', color: 'green-500' },
    { value: 'Bus', label: '🚌 Bus', icon: '🚌', color: 'red-500' },
    { value: 'Bike', label: '🏍️ Bike', icon: '🏍️', color: 'purple-500' }
  ],
  Utilities: [
    { value: 'Electricity', label: '⚡ Electricity', icon: '⚡', color: 'yellow-400' },
    { value: 'Water', label: '💧 Water', icon: '💧', color: 'blue-400' },
    { value: 'Gas', label: '🔥 Gas', icon: '🔥', color: 'red-400' },
    { value: 'Internet', label: '🌐 Internet', icon: '🌐', color: 'blue-600' }
  ],
  Others: [
    { value: 'Shopping', label: '🛍️ Shopping', icon: '🛍️', color: 'pink-500' },
    { value: 'Custom', label: '✏️ Custom Type', icon: '✏️', color: 'gray-500' }
  ]
};

// Note Emojis
export const noteEmojis = [
  '📝', '💼', '🛒', '💡', '📚', '🎯',
  '✨', '🔥', '💪', '🎨', '🎵', '🍕'
];

// Default settings
export const defaultSettings = {
  monthlySalary: 50000,
  monthlyLimit: 50000,
  income: 50000
};

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'PersonalManager_theme',
  USER: 'PersonalManager_user',
  NOTES: 'PersonalManager_notes',
  TASKS: 'PersonalManager_tasks',
  GOALS: 'PersonalManager_goals',
  HABITS: 'PersonalManager_habits',
  EXPENSES: 'PersonalManager_expenses',
  SETTINGS: 'PersonalManager_settings',
  LOGIN_DATE: 'PersonalManager_loginDate'
};

// Get category icon
export const getCategoryIcon = (category) => {
  for (const group in expenseCategories) {
    const found = expenseCategories[group].find(cat => cat.value === category);
    if (found) return found.icon;
  }
  return '💰';
};
