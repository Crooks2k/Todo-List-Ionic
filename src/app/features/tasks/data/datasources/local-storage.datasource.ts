import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '@features/tasks/core/domain/entities/task.entity';
import { Category } from '@features/tasks/core/domain/entities/category.entity';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageDataSource {
  private readonly TASKS_KEY = 'tasks';
  private readonly CATEGORIES_KEY = 'categories';

  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());
  private categoriesSubject = new BehaviorSubject<Category[]>(
    this.loadCategories()
  );

  tasks$ = this.tasksSubject.asObservable();
  categories$ = this.categoriesSubject.asObservable();

  private loadTasks(): Task[] {
    const data = localStorage.getItem(this.TASKS_KEY);
    if (!data) return [];
    const tasks = JSON.parse(data);
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    }));
  }

  private loadCategories(): Category[] {
    const data = localStorage.getItem(this.CATEGORIES_KEY);
    if (!data) return [];
    const categories = JSON.parse(data);
    return categories.map((category: any) => ({
      ...category,
      createdAt: new Date(category.createdAt),
      updatedAt: new Date(category.updatedAt),
    }));
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  saveCategories(categories: Category[]): void {
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories));
    this.categoriesSubject.next(categories);
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }
}
