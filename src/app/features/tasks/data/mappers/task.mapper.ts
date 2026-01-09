import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '../../core/domain/entities/task.entity';

export class TaskMapper {
  static fromCreateDto(dto: CreateTaskDto): Task {
    return {
      id: this.generateId(),
      title: dto.title,
      description: dto.description,
      completed: false,
      categoryId: dto.categoryId,
      dueDate: dto.dueDate,
      subTasks: dto.subTasks || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static fromUpdateDto(existingTask: Task, dto: UpdateTaskDto): Task {
    return {
      ...existingTask,
      ...dto,
      updatedAt: new Date(),
    };
  }

  static toggleCompleted(task: Task): Task {
    const newCompleted = !task.completed;

    return {
      ...task,
      completed: newCompleted,
      subTasks: newCompleted
        ? task.subTasks.map((st) => ({ ...st, completed: true }))
        : task.subTasks.map((st) => ({ ...st, completed: false })),
      updatedAt: new Date(),
    };
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
