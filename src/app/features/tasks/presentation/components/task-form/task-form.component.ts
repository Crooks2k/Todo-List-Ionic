import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonInput } from '@ionic/angular';
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
import { CategorySelectorComponent } from '@features/tasks/presentation/components/category-selector';
import { isControlInvalid } from '@shared/utils/form';

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

  public ngOnInit(): void {
    this.setupI18n();
    if (this.task) {
      this.viewModel.loadTask(this.task);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.viewModel.loadTask(this.task);
    }
  }

  public get isEditMode(): boolean {
    return !!this.task;
  }

  public isTitleInvalid(): boolean {
    return isControlInvalid(
      this.viewModel.form.get(this.config.formFields.title)
    );
  }

  public onSave(): void {
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

  public onCancel(): void {
    this.cancelled.emit();
  }

  public onAddSubTask(): void {
    this.viewModel.addSubTask();
  }

  public onRemoveSubTask(index: number): void {
    this.viewModel.removeSubTask(index);
  }

  public onCategorySelected(categoryId: string): void {
    this.viewModel.form.patchValue({
      [this.config.formFields.categoryId]: categoryId,
    });
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.labels = this.translateProvider.getObject(this.config.i18n.component);
  }
}
