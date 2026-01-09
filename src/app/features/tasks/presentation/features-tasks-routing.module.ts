import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/task-list/task-list.page').then((m) => m.TaskListPage),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/category-manager/category-manager.page').then(
        (m) => m.CategoryManagerPage
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesTasksRoutingModule {}
