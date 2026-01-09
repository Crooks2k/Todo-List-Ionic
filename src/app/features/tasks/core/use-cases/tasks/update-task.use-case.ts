import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRepository } from '@features/tasks/core/domain/repositories/task.repository';
import {
  Task,
  UpdateTaskDto,
} from '@features/tasks/core/domain/entities/task.entity';

@Injectable({
  providedIn: 'root',
})
export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  execute(task: UpdateTaskDto): Observable<Task> {
    return this.taskRepository.update(task);
  }
}
