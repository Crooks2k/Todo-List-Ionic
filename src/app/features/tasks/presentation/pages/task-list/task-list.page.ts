import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Observable, combineLatest, map } from 'rxjs';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '@features/tasks/core/domain/entities/task.entity';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { BasePage } from '@shared/utils/ui/base-page';
import { TaskListConfig } from './task-list.config';
import { CategoryFilterComponent } from '@features/tasks/presentation/components/category-filter';
import { TaskCardComponent } from '@features/tasks/presentation/components/task-card';
import { TaskFormComponent } from '@features/tasks/presentation/components/task-form';
import {
  TaskFilterService,
  TaskManagementService,
  CategoryManagementService,
} from '@features/tasks/presentation/services';
import { TaskTab } from './task-list.config';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CategoryFilterComponent,
    TaskCardComponent,
    TaskFormComponent,
  ],
  providers: [
    TaskFilterService,
    TaskManagementService,
    CategoryManagementService,
  ],
})
export class TaskListPage extends BasePage implements OnInit {
  public readonly config = TaskListConfig;
  public tasks$!: Observable<Task[]>;
  public categories$!: Observable<Category[]>;
  public selectedCategoryIds: string[] = [];
  public selectedTab: TaskTab = this.config.tabs.all;
  public view: any = {};
  public showTaskModal = false;
  public selectedTask?: Task;

  private categoriesMap: Map<string, Category> = new Map();

  constructor(
    private taskFilterService: TaskFilterService,
    private taskManagementService: TaskManagementService,
    private categoryManagementService: CategoryManagementService,
    private translateProvider: TranslateProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setupI18n();
    this.loadCategories();
    this.loadTasks();
  }

  public get emptyStateMessage(): string {
    const key = this.config.emptyStateKeys[this.selectedTab];
    return this.view[key] || this.view.emptyState;
  }

  public get modalTitle(): string {
    return this.selectedTask
      ? this.view.modalTitleEdit
      : this.view.modalTitleCreate;
  }

  public onTabChange(tab: TaskTab): void {
    this.selectedTab = tab;
    this.loadTasks();
  }

  public onToggleTask(taskId: string): void {
    this.taskManagementService.toggleTaskCompleted(taskId).subscribe();
  }

  public onToggleSubTask(event: { taskId: string; subTaskId: string }): void {
    this.taskManagementService
      .toggleSubTask(event.taskId, event.subTaskId)
      .subscribe();
  }

  public onDeleteTask(taskId: string): void {
    this.taskManagementService.deleteTask(taskId).subscribe();
  }

  public onFilterChange(categoryIds: string[]): void {
    this.selectedCategoryIds = categoryIds;
    this.loadTasks();
  }

  public onAddTask(): void {
    this.selectedTask = undefined;
    this.showTaskModal = true;
  }

  public onEditTask(task: Task): void {
    this.selectedTask = task;
    this.showTaskModal = true;
  }

  public onSaveTask(taskDto: CreateTaskDto | UpdateTaskDto): void {
    if (this.taskManagementService.isUpdateDto(taskDto)) {
      this.taskManagementService.updateTask(taskDto).subscribe(() => {
        this.closeTaskModal();
      });
    } else {
      this.taskManagementService.createTask(taskDto).subscribe(() => {
        this.closeTaskModal();
      });
    }
  }

  public closeTaskModal(): void {
    this.showTaskModal = false;
    this.selectedTask = undefined;
  }

  public getCategoryForTask(task: Task): Category | undefined {
    return this.categoryManagementService.getCategoryById(
      this.categoriesMap,
      task.categoryId
    );
  }

  public goToCategories(): void {
    this.navigate(this.config.routes.categories);
  }

  public goBackToHome(): void {
    this.navigate(this.config.routes.home);
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.view = this.translateProvider.getObject(this.config.i18n.page);
  }

  private loadTasks(): void {
    this.tasks$ = combineLatest([
      this.taskManagementService.getTasks(),
      this.categoryManagementService.getCategories(),
    ]).pipe(
      map(([tasks, categories]) => {
        this.categoriesMap =
          this.categoryManagementService.createCategoriesMap(categories);
        return this.taskFilterService.applyFilters(
          tasks,
          this.selectedCategoryIds,
          this.selectedTab
        );
      })
    );
  }

  private loadCategories(): void {
    this.categories$ = this.categoryManagementService.getCategories();
  }
}
