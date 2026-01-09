import { NgModule } from '@angular/core';
import { TaskRepository } from '@features/tasks/core/domain/repositories/task.repository';
import { CategoryRepository } from '@features/tasks/core/domain/repositories/category.repository';
import { TaskRepositoryImpl } from '@features/tasks/data/repositories/task.repository.impl';
import { CategoryRepositoryImpl } from '@features/tasks/data/repositories/category.repository.impl';
import { LocalStorageDataSource } from '@features/tasks/data/datasources/local-storage.datasource';
import { TaskInteractor } from '@features/tasks/core/interactors/task.interactor';
import { CategoryInteractor } from '@features/tasks/core/interactors/category.interactor';

@NgModule({
  providers: [
    LocalStorageDataSource,
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
    { provide: CategoryRepository, useClass: CategoryRepositoryImpl },
    TaskInteractor,
    CategoryInteractor,
  ],
})
export class ServiceProvidersModule {}
