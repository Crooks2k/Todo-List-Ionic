import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable, combineLatest, map } from 'rxjs';
import { Task } from '@features/tasks/core/domain/entities/task.entity';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { TaskInteractor } from '@features/tasks/core/interactors/task.interactor';
import { CategoryInteractor } from '@features/tasks/core/interactors/category.interactor';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { BasePage } from '@shared/utils/ui/base-page';
import { TaskListConfig } from './task-list.config';
import { CategoryFilterComponent } from '../../components/category-filter';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, CategoryFilterComponent],
})
export class TaskListPage extends BasePage implements OnInit {
  tasks$!: Observable<Task[]>;
  categories$!: Observable<Category[]>;
  selectedCategoryIds: string[] = [];
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
    this.loadCategories();
    this.loadTasks();
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.view = this.translateProvider.getObject(this.config.i18n.page);
  }

  private loadTasks(): void {
    this.tasks$ = combineLatest([
      this.taskInteractor.getTasks(),
      this.categoryInteractor.getCategories(),
    ]).pipe(
      map(([tasks]) => {
        if (this.selectedCategoryIds.length === 0) {
          return tasks;
        }
        return tasks.filter((task) =>
          this.selectedCategoryIds.includes(task.categoryId || '')
        );
      })
    );
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

  onFilterChange(categoryIds: string[]): void {
    this.selectedCategoryIds = categoryIds;
    this.loadTasks();
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
