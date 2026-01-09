import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '@features/tasks/core/domain/entities/task.entity';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { TaskFormViewModel } from './view-model/task-form.view-model';
import { TaskFormConfig } from './task-form.config';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { CategorySelectorComponent } from '../category-selector';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    CategorySelectorComponent,
  ],
  providers: [TaskFormViewModel],
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() task?: Task;
  @Input() categories: Category[] = [];
  @Output() save = new EventEmitter<CreateTaskDto | UpdateTaskDto>();
  @Output() cancelled = new EventEmitter<void>();

  public readonly config = TaskFormConfig;
  public labels: any = {};

  constructor(
    public viewModel: TaskFormViewModel,
    private translateProvider: TranslateProvider
  ) {}

  ngOnInit(): void {
    this.setupI18n();
    if (this.task) {
      this.viewModel.loadTask(this.task);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.viewModel.loadTask(this.task);
    }
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.labels = this.translateProvider.getObject(this.config.i18n.component);
  }

  onSave(): void {
    if (this.viewModel.isValid()) {
      const formValue = this.viewModel.getFormValue();
      if (this.task) {
        this.save.emit({
          ...formValue,
          id: this.task.id,
        } as UpdateTaskDto);
      } else {
        this.save.emit(formValue as CreateTaskDto);
      }
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onAddSubTask(): void {
    this.viewModel.addSubTask();
  }

  onRemoveSubTask(index: number): void {
    this.viewModel.removeSubTask(index);
  }

  onCategorySelected(categoryId: string): void {
    this.viewModel.form.patchValue({ categoryId });
  }

  getCategoryById(categoryId: string): Category | undefined {
    return this.categories.find((c) => c.id === categoryId);
  }
}
