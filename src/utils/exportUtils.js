import { getCurrentDate } from './helpers';

// Generic CSV Export Function
export const exportToCSV = (data, filename, headers) => {
  if (!data || data.length === 0) {
    alert('No data to export!');
    return;
  }

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || '';
        // Escape quotes and wrap in quotes if contains comma
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${getCurrentDate()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generic Text Export Function
export const exportToTXT = (data, filename, formatter) => {
  if (!data || data.length === 0) {
    alert('No data to export!');
    return;
  }

  // Create text content
  const txtContent = `
═══════════════════════════════════════════════════
${filename.toUpperCase()} REPORT
═══════════════════════════════════════════════════
Generated: ${new Date().toLocaleString('en-IN')}
═══════════════════════════════════════════════════

${data.map((item, index) => formatter(item, index + 1)).join('\n\n───────────────────────────────────────────────────\n\n')}

═══════════════════════════════════════════════════
Total Records: ${data.length}
═══════════════════════════════════════════════════
`;

  // Create blob and download
  const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${getCurrentDate()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export Expenses
export const exportExpenses = (expenses, format = 'csv') => {
  if (format === 'csv') {
    exportToCSV(
      expenses,
      'expenses',
      ['title', 'amount', 'category', 'date']
    );
  } else {
    exportToTXT(
      expenses,
      'expenses',
      (expense, index) => `
${index}. ${expense.title}
   Amount: ₹${expense.amount.toLocaleString('en-IN')}
   Category: ${expense.category}
   Date: ${new Date(expense.date).toLocaleDateString('en-IN')}
      `
    );
  }
};

// Export Notes
export const exportNotes = (notes, format = 'csv') => {
  if (format === 'csv') {
    exportToCSV(
      notes,
      'notes',
      ['title', 'content', 'category', 'date', 'icon']
    );
  } else {
    exportToTXT(
      notes,
      'notes',
      (note, index) => `
${index}. ${note.icon} ${note.title}
   Category: ${note.category}
   Content: ${note.content}
   Date: ${new Date(note.date).toLocaleDateString('en-IN')}
      `
    );
  }
};

// Export Tasks
export const exportTasks = (tasks, format = 'csv') => {
  if (format === 'csv') {
    exportToCSV(
      tasks,
      'tasks',
      ['title', 'category', 'completed', 'dueDate', 'dueTime', 'reminder']
    );
  } else {
    exportToTXT(
      tasks,
      'tasks',
      (task, index) => `
${index}. ${task.title}
   Category: ${task.category}
   Status: ${task.completed ? 'Completed ✓' : 'Pending'}
   Due Date: ${new Date(task.dueDate).toLocaleDateString('en-IN')}
   Due Time: ${task.dueTime}
   Reminder: ${task.reminder ? 'Yes' : 'No'}
      `
    );
  }
};

// Export Goals
export const exportGoals = (goals, format = 'csv') => {
  if (format === 'csv') {
    exportToCSV(
      goals,
      'goals',
      ['title', 'progress']
    );
  } else {
    exportToTXT(
      goals,
      'goals',
      (goal, index) => `
${index}. ${goal.title}
   Progress: ${goal.progress}%
   Status: ${goal.progress === 100 ? 'Completed ✓' : 'In Progress'}
      `
    );
  }
};

// Export Habits
export const exportHabits = (habits, format = 'csv') => {
  if (format === 'csv') {
    exportToCSV(
      habits,
      'habits',
      ['title', 'completed', 'streak']
    );
  } else {
    exportToTXT(
      habits,
      'habits',
      (habit, index) => `
${index}. ${habit.title}
   Status: ${habit.completed ? 'Done Today ✓' : 'Pending'}
   Streak: ${habit.streak} day${habit.streak !== 1 ? 's' : ''} 🔥
      `
    );
  }
};

// Export All Data
export const exportAllData = (data) => {
  const allData = {
    expenses: data.expenses || [],
    notes: data.notes || [],
    tasks: data.tasks || [],
    goals: data.goals || [],
    habits: data.habits || [],
    settings: data.settings || {}
  };

  const jsonContent = JSON.stringify(allData, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `personal_manager_backup_${getCurrentDate()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
