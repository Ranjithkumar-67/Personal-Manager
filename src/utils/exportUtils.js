// Utility functions to export data

export const exportExpenses = (expenses, format = 'json') => {
  downloadFile(expenses, format, 'expenses');
};

export const exportNotes = (notes, format = 'json') => {
  downloadFile(notes, format, 'notes');
};

export const exportTasks = (tasks, format = 'json') => {
  downloadFile(tasks, format, 'tasks');
};

export const exportGoals = (goals, format = 'json') => {
  downloadFile(goals, format, 'goals');
};

export const exportHabits = (habits, format = 'json') => {
  downloadFile(habits, format, 'habits');
};

const downloadFile = (data, format, filename) => {
  let content = '';
  let mime = '';

  if (format === 'csv') {
    content = convertToCSV(data);
    mime = 'text/csv';
    filename += '.csv';
  } else {
    content = JSON.stringify(data, null, 2);
    mime = 'application/json';
    filename += '.json';
  }

  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const convertToCSV = (data) => {
  if (!Array.isArray(data) || data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const rows = data.map(item =>
    headers.map(h => `"${item[h] ?? ''}"`).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
};
