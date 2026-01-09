import { TaskConstants } from '@features/tasks/core/constants';

export const TaskCardConfig = {
  i18n: {
    moduleKey: 'tasks',
    component: 'components.taskCard',
  },
  defaults: {
    categoryColor: TaskConstants.defaults.categoryColor,
    categoryIcon: TaskConstants.defaults.categoryIcon,
  },
  ui: {
    checkboxSize: TaskConstants.ui.checkboxSize,
    subTaskCheckboxSize: TaskConstants.ui.subTaskCheckboxSize,
    progressBarHeight: TaskConstants.ui.progressBarHeight,
    categoryIndicatorWidth: TaskConstants.ui.categoryIndicatorWidth,
  },
  animation: {
    autoCompleteDelay: TaskConstants.animation.autoCompleteDelay,
  },
  dateFormat: TaskConstants.datetime.dateFormat,
} as const;
