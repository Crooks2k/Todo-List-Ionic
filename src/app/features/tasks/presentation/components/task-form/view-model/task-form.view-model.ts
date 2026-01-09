import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  SubTask,
} from '@features/tasks/core/domain/entities/task.entity';
import { TaskFormConfig } from '../task-form.config';

@Injectable()
export class TaskFormViewModel {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      [TaskFormConfig.formFields.title]: [
        '',
        [
          Validators.required,
          Validators.minLength(TaskFormConfig.validation.titleMinLength),
        ],
      ],
      [TaskFormConfig.formFields.description]: [''],
      [TaskFormConfig.formFields.categoryId]: [''],
      [TaskFormConfig.formFields.dueDate]: [null],
      [TaskFormConfig.formFields.subTasks]: this.fb.array([]),
    });
  }

  get subTasksArray(): FormArray {
    return this.form.get(TaskFormConfig.formFields.subTasks) as FormArray;
  }

  loadTask(task: Task): void {
    this.form.patchValue({
      [TaskFormConfig.formFields.title]: task.title,
      [TaskFormConfig.formFields.description]: task.description,
      [TaskFormConfig.formFields.categoryId]: task.categoryId,
      [TaskFormConfig.formFields.dueDate]: task.dueDate
        ? new Date(task.dueDate).toISOString()
        : null,
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
      [TaskFormConfig.formFields.dueDate]: value[
        TaskFormConfig.formFields.dueDate
      ]
        ? new Date(value[TaskFormConfig.formFields.dueDate])
        : undefined,
      [TaskFormConfig.formFields.subTasks]: value[
        TaskFormConfig.formFields.subTasks
      ].filter((st: SubTask) => st.title.trim() !== ''),
    };
  }

  isValid(): boolean {
    return this.form.valid;
  }

  reset(): void {
    this.form.reset({
      [TaskFormConfig.formFields.title]: '',
      [TaskFormConfig.formFields.description]: '',
      [TaskFormConfig.formFields.categoryId]: '',
      [TaskFormConfig.formFields.dueDate]: null,
    });
    this.subTasksArray.clear();
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
