import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRepository } from '@features/tasks/core/domain/repositories/task.repository';
import { Task } from '@features/tasks/core/domain/entities/task.entity';

@Injectable({
  providedIn: 'root',
})
export class ToggleTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  execute(id: string): Observable<Task> {
    return this.taskRepository.toggleCompleted(id);
  }
}
