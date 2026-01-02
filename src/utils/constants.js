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
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It's going to be hard, but hard does not mean impossible.",
  "Don't wait for opportunity. Create it."
];

// Expense Categories with Indian context
export const expenseCategories = {
  Food: [
    { value: 'Morning', label: '☕ Morning', icon: '☕', color: 'yellow-500' },
    { value: 'Afternoon', label: '🌅 Afternoon', icon: '🌅', color: 'orange-500' },
    { value: 'Night', label: '🌙 Night', icon: '🌙', color: 'blue-500' }
  ],
  Transport: [
    { value: 'Train', label: '🚂 Train', icon: '🚂', color: 'green-500' },
    { value: 'Bus', label: '🚌 Bus', icon: '🚌', color: 'red-500' },
    { value: 'Bike', label: '🏍️ Bike', icon: '🏍️', color: 'purple-500' },
    { value: 'Auto', label: '🛺 Auto', icon: '🛺', color: 'yellow-600' },
    { value: 'Cab', label: '🚕 Cab', icon: '🚕', color: 'orange-600' }
  ],
  Utilities: [
    { value: 'Electricity', label: '⚡ Electricity', icon: '⚡', color: 'yellow-400' },
    { value: 'Water', label: '💧 Water', icon: '💧', color: 'blue-400' },
    { value: 'Gas', label: '🔥 Gas', icon: '🔥', color: 'red-400' },
    { value: 'Internet', label: '🌐 Internet', icon: '🌐', color: 'blue-600' }
  ],
  Mobile: [
    { value: 'MobileRecharge', label: '📱 Mobile Recharge', icon: '📱', color: 'green-500' },
    { value: 'MobileBill', label: '📞 Mobile Bill', icon: '📞', color: 'blue-500' },
    { value: 'DTH', label: '📺 DTH/Cable', icon: '📺', color: 'purple-500' }
  ],
  Groceries: [
    { value: 'MonthlyGroceries', label: '🛒 Monthly Groceries', icon: '🛒', color: 'green-600' },
    { value: 'Vegetables', label: '🥬 Vegetables', icon: '🥬', color: 'green-500' },
    { value: 'Dairy', label: '🥛 Dairy Products', icon: '🥛', color: 'blue-300' },
    { value: 'Fruits', label: '🍎 Fruits', icon: '🍎', color: 'red-400' }
  ],
  Investment: [
    { value: 'SIP', label: '📈 SIP', icon: '📈', color: 'green-600' },
    { value: 'Gold', label: '💰 Gold', icon: '💰', color: 'yellow-600' },
    { value: 'ChitFund', label: '💳 Chit Fund', icon: '💳', color: 'blue-600' },
    { value: 'NewInvestment', label: '💹 New Investment', icon: '💹', color: 'purple-600' },
    { value: 'Stocks', label: '📊 Stocks', icon: '📊', color: 'indigo-600' },
    { value: 'MutualFunds', label: '📉 Mutual Funds', icon: '📉', color: 'teal-600' }
  ],
  Health: [
    { value: 'HealthInsurance', label: '🏥 Health Insurance', icon: '🏥', color: 'red-500' },
    { value: 'Medicine', label: '💊 Medicine', icon: '💊', color: 'pink-500' },
    { value: 'HealthCheckup', label: '🩺 Health Checkup', icon: '🩺', color: 'red-400' },
    { value: 'Doctor', label: '👨‍⚕️ Doctor Visit', icon: '👨‍⚕️', color: 'blue-500' }
  ],
  Others: [
    { value: 'Shopping', label: '🛍️ Shopping', icon: '🛍️', color: 'pink-500' },
    { value: 'Entertainment', label: '🎬 Entertainment', icon: '🎬', color: 'purple-500' },
    { value: 'Education', label: '📚 Education', icon: '📚', color: 'blue-600' },
    { value: 'Rent', label: '🏠 Rent', icon: '🏠', color: 'orange-600' },
    { value: 'Maintenance', label: '🔧 Maintenance', icon: '🔧', color: 'gray-600' },
    { value: 'Gifts', label: '🎁 Gifts', icon: '🎁', color: 'pink-600' },
    { value: 'Custom', label: '✏️ Custom Type', icon: '✏️', color: 'gray-500' }
  ]
};

// Note Emojis for selection
export const noteEmojis = [
  '📝', '💼', '🛒', '💡', '📚', '🎯',
  '✨', '🔥', '💪', '🎨', '🎵', '🍕',
  '☕', '🌟', '💻', '📱', '🎮', '⚽',
  '🏋️', '🧘', '🎓', '💰', '🏠', '🚗'
];

// Default settings
export const defaultSettings = {
  monthlySalary: 50000,
  monthlyLimit: 50000,
  income: 50000
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'personalManager_theme',
  USER: 'personalManager_user',
  NOTES: 'personalManager_notes',
  TASKS: 'personalManager_tasks',
  GOALS: 'personalManager_goals',
  HABITS: 'personalManager_habits',
  EXPENSES: 'personalManager_expenses',
  SETTINGS: 'personalManager_settings',
  LOGIN_DATE: 'personalManager_loginDate'
};

// Get category icon by value
export const getCategoryIcon = (category) => {
  for (const group in expenseCategories) {
    const found = expenseCategories[group].find(cat => cat.value === category);
    if (found) return found.icon;
  }
  return '💰';
};

// Get category color by value
export const getCategoryColor = (category) => {
  for (const group in expenseCategories) {
    const found = expenseCategories[group].find(cat => cat.value === category);
    if (found) return found.color;
  }
  return 'gray-500';
};
