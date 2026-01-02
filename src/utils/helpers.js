// Format number to Indian Rupee format
export const formatIndianRupee = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Format number without currency symbol
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// Get greeting based on time
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'GOOD MORNING';
  if (hour < 17) return 'GOOD AFTERNOON';
  if (hour < 21) return 'GOOD EVENING';
  return 'GOOD NIGHT';
};

// Get day of year
export const getDayOfYear = (date = new Date()) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// Format date to readable format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
};

// Format date to DD/MM/YYYY
export const formatDateIndian = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Get current date in YYYY-MM-DD format
export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Get current time in HH:mm format
export const getCurrentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

// Calculate days between two dates
export const daysBetween = (date1, date2) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const diffTime = Math.abs(new Date(date2) - new Date(date1));
  return Math.ceil(diffTime / oneDay);
};

// Check if date is today
export const isToday = (dateString) => {
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
};

// Check if date is in current month
export const isCurrentMonth = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

// Get month name
export const getMonthName = (monthIndex) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
};

// Get current month name
export const getCurrentMonthName = () => {
  return getMonthName(new Date().getMonth());
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Clamp number between min and max
export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Check if notifications are supported and permitted
export const checkNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
};

// Show notification
export const showNotification = (title, body, icon = '📋') => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon,
      badge: icon,
      vibrate: [200, 100, 200]
    });
  }
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Sort array by date (newest first)
export const sortByDate = (array, dateKey = 'date') => {
  return [...array].sort((a, b) => new Date(b[dateKey]) - new Date(a[dateKey]));
};

// Filter array by date range
export const filterByDateRange = (array, startDate, endDate, dateKey = 'date') => {
  return array.filter(item => {
    const itemDate = new Date(item[dateKey]);
    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
  });
};

// Group array by property
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, {});
};

// Sum array property
export const sumBy = (array, key) => {
  return array.reduce((sum, item) => sum + (parseFloat(item[key]) || 0), 0);
};

// Get greeting emoji
export const getGreetingEmoji = () => {
  const hour = new Date().getHours();
  if (hour < 12) return '🌅';
  if (hour < 17) return '☀️';
  if (hour < 21) return '🌆';
  return '🌙';
};

// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number (Indian)
export const isValidIndianPhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

// Get random item from array
export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
