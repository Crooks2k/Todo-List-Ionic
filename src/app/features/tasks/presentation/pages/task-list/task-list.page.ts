import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Observable, combineLatest, map, take } from 'rxjs';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '@features/tasks/core/domain/entities/task.entity';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { TaskInteractor } from '@features/tasks/core/interactors/task.interactor';
import { CategoryInteractor } from '@features/tasks/core/interactors/category.interactor';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { BasePage } from '@shared/utils/ui/base-page';
import { TaskListConfig } from './task-list.config';
import { CategoryFilterComponent } from '../../components/category-filter';
import { TaskCardComponent } from '../../components/task-card';
import { TaskFormComponent } from '../../components/task-form';

type TaskTab = 'all' | 'completed' | 'overdue';

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
})
export class TaskListPage extends BasePage implements OnInit {
  tasks$!: Observable<Task[]>;
  categories$!: Observable<Category[]>;
  categoriesMap: Map<string, Category> = new Map();
  selectedCategoryIds: string[] = [];
  selectedTab: TaskTab = 'all';
  public view: any = {};
  public readonly config = TaskListConfig;

  showTaskModal = false;
  selectedTask?: Task;

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
      map(([tasks, categories]) => {
        this.categoriesMap = new Map(categories.map((c) => [c.id, c]));

        let filteredTasks = tasks;

        if (this.selectedCategoryIds.length > 0) {
          filteredTasks = filteredTasks.filter((task) =>
            this.selectedCategoryIds.includes(task.categoryId || '')
          );
        }

        switch (this.selectedTab) {
          case 'completed':
            return filteredTasks.filter((task) => task.completed);
          case 'overdue':
            return filteredTasks.filter((task) => {
              if (!task.dueDate || task.completed) return false;
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const dueDate = new Date(task.dueDate);
              dueDate.setHours(0, 0, 0, 0);
              return dueDate < today;
            });
          default:
            return filteredTasks.filter((task) => {
              if (task.completed) return false;
              if (!task.dueDate) return true;
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const dueDate = new Date(task.dueDate);
              dueDate.setHours(0, 0, 0, 0);
              return dueDate >= today;
            });
        }
      })
    );
  }

  private loadCategories(): void {
    this.categories$ = this.categoryInteractor.getCategories();
  }

  onTabChange(tab: TaskTab): void {
    this.selectedTab = tab;
    this.loadTasks();
  }

  onToggleTask(taskId: string): void {
    this.taskInteractor.toggleTaskCompleted(taskId).subscribe();
  }

  onToggleSubTask(event: { taskId: string; subTaskId: string }): void {
    this.taskInteractor
      .getTasks()
      .pipe(take(1))
      .subscribe((tasks) => {
        const task = tasks.find((t) => t.id === event.taskId);
        if (task && task.subTasks) {
          const updatedSubTasks = task.subTasks.map((st) =>
            st.id === event.subTaskId ? { ...st, completed: !st.completed } : st
          );
          this.taskInteractor
            .updateTask({ id: task.id, subTasks: updatedSubTasks })
            .subscribe();
        }
      });
  }

  onDeleteTask(taskId: string): void {
    this.taskInteractor.deleteTask(taskId).subscribe();
  }

  onFilterChange(categoryIds: string[]): void {
    this.selectedCategoryIds = categoryIds;
    this.loadTasks();
  }

  onAddTask(): void {
    this.selectedTask = undefined;
    this.showTaskModal = true;
  }

  onEditTask(task: Task): void {
    this.selectedTask = task;
    this.showTaskModal = true;
  }

  onSaveTask(taskDto: CreateTaskDto | UpdateTaskDto): void {
    if ('id' in taskDto) {
      this.taskInteractor.updateTask(taskDto as UpdateTaskDto).subscribe(() => {
        this.closeTaskModal();
        this.loadTasks();
      });
    } else {
      this.taskInteractor.createTask(taskDto as CreateTaskDto).subscribe(() => {
        this.closeTaskModal();
        this.loadTasks();
      });
    }
  }

  closeTaskModal(): void {
    this.showTaskModal = false;
    this.selectedTask = undefined;
  }

  getCategoryForTask(task: Task): Category | undefined {
    return task.categoryId
      ? this.categoriesMap.get(task.categoryId)
      : undefined;
  }

  goToCategories(): void {
    this.navigate(this.config.routes.categories);
  }

  goBackToHome(): void {
    this.navigate(this.config.routes.home);
  }

  get emptyStateMessage(): string {
    switch (this.selectedTab) {
      case 'completed':
        return this.view.emptyCompleted;
      case 'overdue':
        return this.view.emptyOverdue;
      default:
        return this.view.emptyState;
    }
  }
}
