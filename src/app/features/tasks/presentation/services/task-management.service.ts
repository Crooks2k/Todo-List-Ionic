import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '@features/tasks/core/domain/entities/task.entity';
import { TaskInteractor } from '@features/tasks/core/interactors/task.interactor';

@Injectable()
export class TaskManagementService {
  constructor(private taskInteractor: TaskInteractor) {}

  public getTasks(): Observable<Task[]> {
    return this.taskInteractor.getTasks();
  }

  public createTask(taskDto: CreateTaskDto): Observable<Task> {
    return this.taskInteractor.createTask(taskDto);
  }

  public updateTask(taskDto: UpdateTaskDto): Observable<Task> {
    return this.taskInteractor.updateTask(taskDto);
  }

  public deleteTask(taskId: string): Observable<void> {
    return this.taskInteractor.deleteTask(taskId);
  }

  public toggleTaskCompleted(taskId: string): Observable<Task> {
    return this.taskInteractor.toggleTaskCompleted(taskId);
  }

  public toggleSubTask(
    taskId: string,
    subTaskId: string
  ): Observable<Task | null> {
    return new Observable((observer) => {
      this.taskInteractor
        .getTasks()
        .pipe(take(1))
        .subscribe((tasks) => {
          const task = tasks.find((t) => t.id === taskId);
          if (task?.subTasks) {
            const updatedSubTasks = task.subTasks.map((st) =>
              st.id === subTaskId ? { ...st, completed: !st.completed } : st
            );
            this.taskInteractor
              .updateTask({ id: task.id, subTasks: updatedSubTasks })
              .subscribe({
                next: (updatedTask) => {
                  observer.next(updatedTask);
                  observer.complete();
                },
                error: (error) => observer.error(error),
              });
          } else {
            observer.next(null);
            observer.complete();
          }
        });
    });
  }

  public isUpdateDto(dto: CreateTaskDto | UpdateTaskDto): dto is UpdateTaskDto {
    return 'id' in dto;
  }
}
