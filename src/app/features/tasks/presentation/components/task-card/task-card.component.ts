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

  ngOnInit(): void {
    this.setupI18n();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.checkAutoComplete();
    }
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.labels = this.translateProvider.getObject(this.config.i18n.component);
  }

  get progress(): number {
    if (!this.task.subTasks || this.task.subTasks.length === 0) {
      return this.task.completed ? 100 : 0;
    }
    const completed = this.task.subTasks.filter((st) => st.completed).length;
    return Math.round((completed / this.task.subTasks.length) * 100);
  }

  get isOverdue(): boolean {
    if (!this.task.dueDate || this.task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(this.task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  }

  get categoryColor(): string {
    return this.category?.color || '#95a5a6';
  }

  get categoryIcon(): string {
    return this.category?.icon || 'pricetag';
  }

  get categoryName(): string {
    return this.category?.name || this.labels.noCategory || '';
  }

  toggleExpand(): void {
    if (this.task.subTasks && this.task.subTasks.length > 0) {
      this.expanded = !this.expanded;
    }
  }

  onToggleComplete(): void {
    this.toggleComplete.emit(this.task.id);
  }

  onToggleSubTask(subTask: SubTask): void {
    this.toggleSubTask.emit({
      taskId: this.task.id,
      subTaskId: subTask.id,
    });
  }

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  private checkAutoComplete(): void {
    if (this.task.subTasks && this.task.subTasks.length > 0) {
      const allCompleted = this.task.subTasks.every((st) => st.completed);
      if (allCompleted && !this.task.completed) {
        setTimeout(() => this.toggleComplete.emit(this.task.id), 300);
      }
    }
  }
}
