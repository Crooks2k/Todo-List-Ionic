import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeaturesTasksRoutingModule } from './features-tasks-routing.module';
import { TaskRepository } from '@features/tasks/core/domain/repositories/task.repository';
import { CategoryRepository } from '@features/tasks/core/domain/repositories/category.repository';
import { TaskRepositoryImpl } from '@features/tasks/data/repositories/task.repository.impl';
import { CategoryRepositoryImpl } from '@features/tasks/data/repositories/category.repository.impl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FeaturesTasksRoutingModule,
  ],
  declarations: [],
  providers: [
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
    { provide: CategoryRepository, useClass: CategoryRepositoryImpl },
  ],
})
export class FeaturesTasksModule {}
