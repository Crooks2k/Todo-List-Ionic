import { TaskConstants } from '@features/tasks/core/constants';

export const CategorySelectorConfig = {
  i18n: {
    moduleKey: 'tasks',
    component: 'components.categorySelector',
  },
  modal: {
    cssClass: 'category-selector-sheet',
  },
  search: {
    debounce: TaskConstants.debounce.searchDelay,
  },
  defaults: {
    icon: TaskConstants.defaults.categoryIcon,
  },
} as const;
