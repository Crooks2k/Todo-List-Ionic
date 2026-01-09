import { Observable } from 'rxjs';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '@features/tasks/core/domain/entities/task.entity';

export abstract class TaskRepository {
  abstract getAll(): Observable<Task[]>;
  abstract getById(id: string): Observable<Task | null>;
  abstract create(task: CreateTaskDto): Observable<Task>;
  abstract update(task: UpdateTaskDto): Observable<Task>;
  abstract delete(id: string): Observable<void>;
  abstract toggleCompleted(id: string): Observable<Task>;
  abstract getByCategory(categoryId: string): Observable<Task[]>;
}
