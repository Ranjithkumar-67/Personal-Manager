import React from 'react';
import * as Icons from './Icons';
import { formatDate } from '../utils/helpers';

const TasksPage = ({ 
  isDarkTheme, 
  tasks, 
  setTasks,
  setShowAddTask,
  handle3DMove,
  handle3DLeave,
  onExportTasks
}) => {
  const cardClasses = isDarkTheme
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
    : 'bg-white border-2 border-blue-200';

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  /* ✅ CHECK OVERDUE (LOGIC FIX) */
  const isOverdue = (task) => {
    if (!task.dueDate || task.completed) return false;
    const now = new Date();
    const taskDateTime = new Date(`${task.dueDate}T${task.dueTime || '23:59'}`);
    return taskDateTime < now;
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="space-y-4 animate-slideIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">TASKS</h1>
        <div className="flex gap-2">
          <button
            onClick={() => onExportTasks('csv')}
            className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all"
            title="Export CSV"
          >
            <Icons.Download size={18} />
          </button>
          <button
            onClick={() => onExportTasks('txt')}
            className="p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-all"
            title="Export TXT"
          >
            <Icons.FileText size={18} />
          </button>
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all hover:scale-105"
          >
            <Icons.Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <div className={`${cardClasses} p-12 rounded-2xl text-center`}>
          <Icons.ListTodo size={64} className="mx-auto mb-4 opacity-30" />
          <p className={`text-lg font-semibold ${isDarkTheme ? 'text-slate-400' : 'text-gray-500'}`}>
            No tasks yet. Add your first task!
          </p>
        </div>
      ) : (
        <>
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <div>
              <h2 className="text-sm font-bold mb-2 opacity-60">
                PENDING ({pendingTasks.length})
              </h2>

              <div className="space-y-3">
                {pendingTasks.map((task) => {
                  const overdue = isOverdue(task);

                  return (
                    <div
                      key={task.id}
                      className={`${cardClasses} p-4 rounded-2xl shadow-lg card-3d`}
                      onMouseMove={(e) => handle3DMove(e, 30)}
                      onMouseLeave={handle3DLeave}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <button
                          onClick={() => handleToggleTask(task.id)}
                          className="flex-shrink-0 mt-1"
                        >
                          <Icons.Circle size={24} className="text-slate-600" />
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg mb-1">
                            {task.title}
                          </h3>

                          <p className={`text-xs mb-2 ${isDarkTheme ? 'text-slate-500' : 'text-gray-500'}`}>
                            {task.category}
                          </p>
                          
                          <div className="flex items-center gap-3 flex-wrap text-sm">
                            <div className="flex items-center gap-1">
                              <Icons.Clock size={14} />
                              <span>
                                {formatDate(task.dueDate)} • {task.dueTime}
                              </span>
                            </div>

                            {task.reminder && (
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Icons.AlarmClock size={14} />
                                <span className="text-xs">Reminder (In-app)</span>
                              </div>
                            )}

                            {overdue && (
                              <div className="flex items-center gap-1 text-red-500">
                                <Icons.AlertTriangle size={14} />
                                <span className="text-xs font-bold">
                                  Overdue
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-500 hover:bg-red-500/20 p-2 rounded-lg transition-all flex-shrink-0"
                        >
                          <Icons.Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-sm font-bold mb-2 opacity-60">
                COMPLETED ({completedTasks.length})
              </h2>

              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`${cardClasses} p-4 rounded-2xl shadow-lg opacity-75`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className="flex-shrink-0 mt-1"
                      >
                        <Icons.CheckCircle2 size={24} className="text-green-500" />
                      </button>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-1 line-through opacity-50">
                          {task.title}
                        </h3>
                        <p className="text-xs opacity-50">
                          {formatDate(task.dueDate)} • {task.dueTime}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:bg-red-500/20 p-2 rounded-lg transition-all flex-shrink-0"
                      >
                        <Icons.Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TasksPage;

