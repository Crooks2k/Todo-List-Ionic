export type TaskTab = 'all' | 'completed' | 'overdue';

export const TaskListConfig = {
  i18n: {
    moduleKey: 'tasks',
    page: 'pages.taskList',
  },
  routes: {
    home: '/home',
    categories: '/tasks/categories',
  },
  tabs: {
    all: 'all' as TaskTab,
    completed: 'completed' as TaskTab,
    overdue: 'overdue' as TaskTab,
  },
  emptyStateKeys: {
    all: 'emptyState',
    completed: 'emptyCompleted',
    overdue: 'emptyOverdue',
  },
} as const;
