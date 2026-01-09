export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  categoryId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  categoryId?: string;
}

export interface UpdateTaskDto {
  id: string;
  title?: string;
  description?: string;
  categoryId?: string;
  completed?: boolean;
}
