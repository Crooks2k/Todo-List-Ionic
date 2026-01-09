import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { TaskRepository } from '@features/tasks/core/domain/repositories/task.repository';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '@features/tasks/core/domain/entities/task.entity';
import { LocalStorageDataSource } from '@features/tasks/data/datasources/local-storage.datasource';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable({
  providedIn: 'root',
})
export class TaskRepositoryImpl extends TaskRepository {
  constructor(private dataSource: LocalStorageDataSource) {
    super();
  }

  getAll(): Observable<Task[]> {
    return this.dataSource.getTasks();
  }

  getById(id: string): Observable<Task | null> {
    return this.dataSource.getTasks().pipe(
      take(1),
      map((tasks) => tasks.find((task) => task.id === id) || null)
    );
  }

  create(taskDto: CreateTaskDto): Observable<Task> {
    return this.dataSource.getTasks().pipe(
      take(1),
      map((tasks) => {
        const newTask = TaskMapper.fromCreateDto(taskDto);
        const updatedTasks = [...tasks, newTask];
        this.dataSource.saveTasks(updatedTasks);
        return newTask;
      })
    );
  }

  update(taskDto: UpdateTaskDto): Observable<Task> {
    return this.dataSource.getTasks().pipe(
      take(1),
      map((tasks) => {
        const index = tasks.findIndex((task) => task.id === taskDto.id);
        if (index === -1) {
          throw new Error('Task not found');
        }
        const updatedTask = TaskMapper.fromUpdateDto(tasks[index], taskDto);
        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask;
        this.dataSource.saveTasks(updatedTasks);
        return updatedTask;
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.dataSource.getTasks().pipe(
      take(1),
      map((tasks) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        this.dataSource.saveTasks(updatedTasks);
      })
    );
  }

  toggleCompleted(id: string): Observable<Task> {
    return this.dataSource.getTasks().pipe(
      take(1),
      map((tasks) => {
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) {
          throw new Error('Task not found');
        }
        const updatedTask = TaskMapper.toggleCompleted(tasks[index]);
        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask;
        this.dataSource.saveTasks(updatedTasks);
        return updatedTask;
      })
    );
  }

  getByCategory(categoryId: string): Observable<Task[]> {
    return this.dataSource.getTasks().pipe(
      take(1),
      map((tasks) => tasks.filter((task) => task.categoryId === categoryId))
    );
  }
}
