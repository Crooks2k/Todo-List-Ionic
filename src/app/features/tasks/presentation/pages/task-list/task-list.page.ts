import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '@features/tasks/core/domain/entities/task.entity';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { TaskInteractor } from '@features/tasks/core/interactors/task.interactor';
import { CategoryInteractor } from '@features/tasks/core/interactors/category.interactor';
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
    private taskInteractor: TaskInteractor,
    private categoryInteractor: CategoryInteractor,
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
    this.tasks$ = this.taskInteractor.getTasks();
  }

  private loadCategories(): void {
    this.categories$ = this.categoryInteractor.getCategories();
  }

  onToggleTask(taskId: string): void {
    this.taskInteractor.toggleTaskCompleted(taskId).subscribe();
  }

  onDeleteTask(taskId: string): void {
    this.taskInteractor.deleteTask(taskId).subscribe();
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
