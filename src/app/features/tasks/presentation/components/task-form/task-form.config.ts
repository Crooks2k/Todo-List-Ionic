import { TaskConstants } from '@features/tasks/core/constants';

export const TaskFormConfig = {
  i18n: {
    moduleKey: 'tasks',
    component: 'components.taskForm',
  },
  validation: {
    titleMinLength: TaskConstants.validation.titleMinLength,
  },
  datetime: {
    locale: TaskConstants.datetime.locale,
  },
  modal: {
    cssClass: 'datetime-modal',
  },
  formFields: {
    title: 'title',
    description: 'description',
    categoryId: 'categoryId',
    dueDate: 'dueDate',
    subTasks: 'subTasks',
  },
} as const;
