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
import {
  Task,
  SubTask,
} from '@features/tasks/core/domain/entities/task.entity';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { TaskCardConfig } from './task-card.config';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { isDateOverdue } from '@shared/utils/date';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class TaskCardComponent implements OnInit, OnChanges {
  @Input() task!: Task;
  @Input() category?: Category;
  @Output() toggleComplete = new EventEmitter<string>();
  @Output() toggleSubTask = new EventEmitter<{
    taskId: string;
    subTaskId: string;
  }>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  public readonly config = TaskCardConfig;
  public labels: any = {};
  public expanded = false;

  constructor(private translateProvider: TranslateProvider) {}

  public ngOnInit(): void {
    this.setupI18n();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.checkAutoComplete();
    }
  }

  public get progress(): number {
    if (!this.task.subTasks || this.task.subTasks.length === 0) {
      return this.task.completed ? 100 : 0;
    }
    const completed = this.task.subTasks.filter((st) => st.completed).length;
    return Math.round((completed / this.task.subTasks.length) * 100);
  }

  public get isOverdue(): boolean {
    if (!this.task.dueDate || this.task.completed) return false;
    return isDateOverdue(this.task.dueDate);
  }

  public get categoryColor(): string {
    return this.category?.color || this.config.defaults.categoryColor;
  }

  public get categoryIcon(): string {
    return this.category?.icon || this.config.defaults.categoryIcon;
  }

  public get categoryName(): string {
    return this.category?.name || this.labels.noCategory || '';
  }

  public get hasSubTasks(): boolean {
    return !!(this.task.subTasks && this.task.subTasks.length > 0);
  }

  public toggleExpand(): void {
    if (this.hasSubTasks) {
      this.expanded = !this.expanded;
    }
  }

  public onToggleComplete(): void {
    this.toggleComplete.emit(this.task.id);
  }

  public onToggleSubTask(subTask: SubTask): void {
    this.toggleSubTask.emit({
      taskId: this.task.id,
      subTaskId: subTask.id,
    });
  }

  public onEdit(): void {
    this.edit.emit(this.task);
  }

  public onDelete(): void {
    this.delete.emit(this.task.id);
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.labels = this.translateProvider.getObject(this.config.i18n.component);
  }

  private checkAutoComplete(): void {
    if (this.task.subTasks && this.task.subTasks.length > 0) {
      const allCompleted = this.task.subTasks.every((st) => st.completed);
      if (allCompleted && !this.task.completed) {
        setTimeout(
          () => this.toggleComplete.emit(this.task.id),
          this.config.animation.autoCompleteDelay
        );
      }
    }
  }
}
