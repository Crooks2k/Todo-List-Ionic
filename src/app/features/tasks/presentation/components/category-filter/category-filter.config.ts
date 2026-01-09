import { TaskConstants } from '@features/tasks/core/constants';

export const CategoryFilterConfig = {
  i18n: {
    moduleKey: 'tasks',
    component: 'components.categoryFilter',
  },
  search: {
    debounce: TaskConstants.debounce.searchDelay,
  },
  defaults: {
    icon: TaskConstants.defaults.categoryIcon,
  },
} as const;
