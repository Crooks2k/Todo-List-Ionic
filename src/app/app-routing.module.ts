import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/presentation/features-home.module').then(
        (m) => m.FeaturesHomeModule
      ),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/tasks/presentation/features-tasks.module').then(
        (m) => m.FeaturesTasksModule
      ),
  },
  {
    path: 'releases',
    loadChildren: () =>
      import('./features/releases/presentation/features-releases.module').then(
        (m) => m.FeaturesReleasesModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
