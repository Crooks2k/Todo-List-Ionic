export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  categoryId?: string;
  dueDate?: Date;
  subTasks: SubTask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  categoryId?: string;
  dueDate?: Date;
  subTasks?: SubTask[];
}

export interface UpdateTaskDto {
  id: string;
  title?: string;
  description?: string;
  categoryId?: string;
  completed?: boolean;
  dueDate?: Date;
  subTasks?: SubTask[];
}
