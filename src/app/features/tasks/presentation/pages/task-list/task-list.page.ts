import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Observable, combineLatest, map, BehaviorSubject } from 'rxjs';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '@features/tasks/core/domain/entities/task.entity';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { BasePage } from '@shared/utils/ui/base-page';
import { TaskListConfig, TaskTab } from './task-list.config';
import { CategoryFilterComponent } from '@features/tasks/presentation/components/category-filter';
import { TaskCardComponent } from '@features/tasks/presentation/components/task-card';
import { TaskFormComponent } from '@features/tasks/presentation/components/task-form';
import {
  TaskFilterService,
  TaskManagementService,
  CategoryManagementService,
} from '@features/tasks/presentation/services';

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
  public hasMoreTasks = true;

  private readonly PAGE_SIZE = 10;
  private currentPage$ = new BehaviorSubject<number>(1);
  private allTasks: Task[] = [];
  private categoriesMap: Map<string, Category> = new Map();

  constructor(
    private taskFilterService: TaskFilterService,
    private taskManagementService: TaskManagementService,
    private categoryManagementService: CategoryManagementService,
    private translateProvider: TranslateProvider,
    private alertController: AlertController,
    private toastController: ToastController
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
    this.resetPagination();
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
    const task = this.allTasks.find((t) => t.id === taskId);
    if (!task) return;

    this.showDeleteConfirmation(task);
  }

  private async showDeleteConfirmation(task: Task): Promise<void> {
    const alert = await this.alertController.create({
      header: this.view.deleteConfirmTitle,
      message: this.view.deleteConfirmMessage.replace('{title}', task.title),
      buttons: [
        {
          text: this.view.cancelButton,
          role: 'cancel',
        },
        {
          text: this.view.deleteButton,
          role: 'destructive',
          handler: () => {
            this.taskManagementService.deleteTask(task.id).subscribe({
              next: () => {
                this.showToast(this.view.deleteSuccess);
              },
              error: () => {
                this.showToast(this.view.deleteError);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  public onFilterChange(categoryIds: string[]): void {
    this.selectedCategoryIds = categoryIds;
    this.resetPagination();
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

  public loadMore(event: any): void {
    const currentPage = this.currentPage$.value;
    const totalPages = Math.ceil(this.allTasks.length / this.PAGE_SIZE);

    if (currentPage < totalPages) {
      setTimeout(() => {
        this.currentPage$.next(currentPage + 1);
        this.hasMoreTasks = currentPage + 1 < totalPages;
        event.target.complete();
      }, 300);
    } else {
      this.hasMoreTasks = false;
      event.target.complete();
    }
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.view = this.translateProvider.getObject(this.config.i18n.page);
  }

  private loadTasks(): void {
    this.tasks$ = combineLatest([
      this.taskManagementService.getTasks(),
      this.categoryManagementService.getCategories(),
      this.currentPage$,
    ]).pipe(
      map(([tasks, categories, currentPage]) => {
        this.categoriesMap =
          this.categoryManagementService.createCategoriesMap(categories);

        // Filtrar todas las tareas
        this.allTasks = this.taskFilterService.applyFilters(
          tasks,
          this.selectedCategoryIds,
          this.selectedTab
        );

        // Retornar solo las tareas de las páginas cargadas
        const endIndex = currentPage * this.PAGE_SIZE;
        return this.allTasks.slice(0, endIndex);
      })
    );
  }

  private loadCategories(): void {
    this.categories$ = this.categoryManagementService.getCategories();
  }

  private resetPagination(): void {
    this.currentPage$.next(1);
  }
}
