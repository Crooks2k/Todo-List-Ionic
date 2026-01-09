import { TaskConstants } from '@features/tasks/core/constants';

export const CategoryFormConfig = {
  i18n: {
    moduleKey: 'tasks',
    view: 'components.categoryForm',
  },
  validation: {
    nameMinLength: TaskConstants.validation.nameMinLength,
  },
  formFields: {
    name: 'name',
    color: 'color',
    icon: 'icon',
  },
} as const;
