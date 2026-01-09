import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRepository } from '@features/tasks/core/domain/repositories/task.repository';
import {
  Task,
  CreateTaskDto,
} from '@features/tasks/core/domain/entities/task.entity';

@Injectable({
  providedIn: 'root',
})
export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  execute(task: CreateTaskDto): Observable<Task> {
    return this.taskRepository.create(task);
  }
}
