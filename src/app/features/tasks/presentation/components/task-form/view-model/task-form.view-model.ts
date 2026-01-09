import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  SubTask,
} from '@features/tasks/core/domain/entities/task.entity';

@Injectable()
export class TaskFormViewModel {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      categoryId: [''],
      dueDate: [null],
      subTasks: this.fb.array([]),
    });
  }

  get subTasksArray(): FormArray {
    return this.form.get('subTasks') as FormArray;
  }

  loadTask(task: Task): void {
    this.form.patchValue({
      title: task.title,
      description: task.description,
      categoryId: task.categoryId,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
    });

    this.subTasksArray.clear();
    if (task.subTasks && task.subTasks.length > 0) {
      task.subTasks.forEach((subTask) => {
        this.addSubTask(subTask);
      });
    }
  }

  addSubTask(subTask?: SubTask): void {
    const subTaskGroup = this.fb.group({
      id: [subTask?.id || this.generateId()],
      title: [subTask?.title || '', Validators.required],
      completed: [subTask?.completed || false],
    });
    this.subTasksArray.push(subTaskGroup);
  }

  removeSubTask(index: number): void {
    this.subTasksArray.removeAt(index);
  }

  getFormValue(): CreateTaskDto | UpdateTaskDto {
    const value = this.form.value;
    return {
      ...value,
      dueDate: value.dueDate ? new Date(value.dueDate) : undefined,
      subTasks: value.subTasks.filter((st: SubTask) => st.title.trim() !== ''),
    };
  }

  isValid(): boolean {
    return this.form.valid;
  }

  reset(): void {
    this.form.reset({
      title: '',
      description: '',
      categoryId: '',
      dueDate: null,
    });
    this.subTasksArray.clear();
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
