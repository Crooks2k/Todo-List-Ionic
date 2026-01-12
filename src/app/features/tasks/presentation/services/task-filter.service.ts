import { Injectable } from '@angular/core';
import { Task } from '@features/tasks/core/domain/entities/task.entity';
import { isDateOverdue } from '@shared/utils/date';
import { TaskTab } from '../pages/task-list/task-list.config';

@Injectable()
export class TaskFilterService {
  public filterByCategories(
    tasks: Task[],
    selectedCategoryIds: string[]
  ): Task[] {
    if (selectedCategoryIds.length === 0) {
      return tasks;
    }
    return tasks.filter((task) =>
      selectedCategoryIds.includes(task.categoryId || '')
    );
  }

  public filterByTab(tasks: Task[], tab: TaskTab): Task[] {
    switch (tab) {
      case 'completed':
        return this.getCompletedTasks(tasks);
      case 'overdue':
        return this.getOverdueTasks(tasks);
      default:
        return this.getActiveTasks(tasks);
    }
  }

  public applyFilters(
    tasks: Task[],
    selectedCategoryIds: string[],
    tab: TaskTab
  ): Task[] {
    const filteredByCategory = this.filterByCategories(
      tasks,
      selectedCategoryIds
    );
    return this.filterByTab(filteredByCategory, tab);
  }

  private getCompletedTasks(tasks: Task[]): Task[] {
    return tasks.filter((task) => task.completed);
  }

  private getOverdueTasks(tasks: Task[]): Task[] {
    return tasks.filter((task) => {
      if (!task.dueDate || task.completed) return false;
      return isDateOverdue(task.dueDate);
    });
  }

  private getActiveTasks(tasks: Task[]): Task[] {
    return tasks.filter((task) => {
      if (task.completed) return false;
      if (!task.dueDate) return true;
      return !isDateOverdue(task.dueDate);
    });
  }
}
