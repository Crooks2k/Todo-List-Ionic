export const TaskConstants = {
  validation: {
    titleMinLength: 3,
    nameMinLength: 3,
  },
  ui: {
    checkboxSize: 24,
    subTaskCheckboxSize: 20,
    checkboxBorderWidth: 2,
    progressBarHeight: 6,
    categoryIndicatorWidth: 4,
  },
  defaults: {
    categoryColor: '#95a5a6',
    categoryIcon: 'pricetag',
  },
  datetime: {
    locale: 'es-ES',
    dateFormat: 'dd/MM',
  },
  debounce: {
    searchDelay: 300,
  },
  animation: {
    autoCompleteDelay: 300,
  },
} as const;
