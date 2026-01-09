export const HomeConfig = Object.freeze({
  i18n: {
    moduleKey: 'home',
    page: 'home',
    buttons: {
      addTask: 'home.buttons.addTask',
      viewTasks: 'home.buttons.viewTasks',
    },
    messages: {
      noTasks: 'home.messages.noTasks',
      loading: 'home.messages.loading',
    },
  },
  images: {
    logo: 'assets/icon/favicon.png',
  },
  routes: {
    tasks: '/tasks/list',
    categories: '/tasks/categories',
    releases: '/releases/list',
  },
});
