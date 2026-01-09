import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '../domain/entities/task.entity';
import { GetTasksUseCase } from '../use-cases/tasks/get-tasks.use-case';
import { CreateTaskUseCase } from '../use-cases/tasks/create-task.use-case';
import { UpdateTaskUseCase } from '../use-cases/tasks/update-task.use-case';
import { DeleteTaskUseCase } from '../use-cases/tasks/delete-task.use-case';
import { ToggleTaskUseCase } from '../use-cases/tasks/toggle-task.use-case';
import { GetTasksByCategoryUseCase } from '../use-cases/tasks/get-tasks-by-category.use-case';

@Injectable()
export class TaskInteractor {
  constructor(
    private getTasksUseCase: GetTasksUseCase,
    private createTaskUseCase: CreateTaskUseCase,
    private updateTaskUseCase: UpdateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private toggleTaskUseCase: ToggleTaskUseCase,
    private getTasksByCategoryUseCase: GetTasksByCategoryUseCase
  ) {}

  getTasks(): Observable<Task[]> {
    return this.getTasksUseCase.execute();
  }

  getTasksByCategory(categoryId: string): Observable<Task[]> {
    return this.getTasksByCategoryUseCase.execute(categoryId);
  }

  createTask(taskDto: CreateTaskDto): Observable<Task> {
    return this.createTaskUseCase.execute(taskDto);
  }

  updateTask(taskDto: UpdateTaskDto): Observable<Task> {
    return this.updateTaskUseCase.execute(taskDto);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.deleteTaskUseCase.execute(taskId);
  }

  toggleTaskCompleted(taskId: string): Observable<Task> {
    return this.toggleTaskUseCase.execute(taskId);
  }
}
