import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRepository } from '@features/tasks/core/domain/repositories/task.repository';
import { Task } from '@features/tasks/core/domain/entities/task.entity';

@Injectable({
  providedIn: 'root',
})
export class GetTasksByCategoryUseCase {
  constructor(private taskRepository: TaskRepository) {}

  execute(categoryId: string): Observable<Task[]> {
    return this.taskRepository.getByCategory(categoryId);
  }
}
