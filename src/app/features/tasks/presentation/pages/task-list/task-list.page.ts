import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '@features/tasks/core/domain/entities/task.entity';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { GetTasksUseCase } from '@features/tasks/core/use-cases/tasks/get-tasks.use-case';
import { GetCategoriesUseCase } from '@features/tasks/core/use-cases/categories/get-categories.use-case';
import { ToggleTaskUseCase } from '@features/tasks/core/use-cases/tasks/toggle-task.use-case';
import { DeleteTaskUseCase } from '@features/tasks/core/use-cases/tasks/delete-task.use-case';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { BasePage } from '@shared/utils/ui/base-page';
import { TaskListConfig } from './task-list.config';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class TaskListPage extends BasePage implements OnInit {
  tasks$!: Observable<Task[]>;
  categories$!: Observable<Category[]>;
  selectedCategoryId: string | null = null;
  public view: any = {};
  public readonly config = TaskListConfig;

  constructor(
    private getTasksUseCase: GetTasksUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase,
    private toggleTaskUseCase: ToggleTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private translateProvider: TranslateProvider
  ) {
    super();
  }

  ngOnInit(): void {
    this.setupI18n();
    this.loadTasks();
    this.loadCategories();
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.view = this.translateProvider.getObject(this.config.i18n.page);
  }

  private loadTasks(): void {
    this.tasks$ = this.getTasksUseCase.execute();
  }

  private loadCategories(): void {
    this.categories$ = this.getCategoriesUseCase.execute();
  }

  onToggleTask(taskId: string): void {
    this.toggleTaskUseCase.execute(taskId).subscribe();
  }

  onDeleteTask(taskId: string): void {
    this.deleteTaskUseCase.execute(taskId).subscribe();
  }

  onFilterByCategory(categoryId: string | number | undefined | null): void {
    this.selectedCategoryId =
      typeof categoryId === 'string' ? categoryId : null;
  }

  onAddTask(): void {
    console.log('Add task - TODO: Implement modal');
  }

  goToCategories(): void {
    this.navigate(this.config.routes.categories);
  }

  goBackToHome(): void {
    this.navigate(this.config.routes.home);
  }
}
