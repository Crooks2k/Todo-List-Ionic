import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRepository } from '@features/tasks/core/domain/repositories/task.repository';
import { Task } from '@features/tasks/core/domain/entities/task.entity';

@Injectable({
  providedIn: 'root',
})
export class GetTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  execute(): Observable<Task[]> {
    return this.taskRepository.getAll();
  }
}
