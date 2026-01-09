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
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';
import { CategoryFormViewModel } from './view-model/category-form.view-model';
import { CategoryFormConfig } from './category-form.config';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  providers: [CategoryFormViewModel],
})
export class CategoryFormComponent implements OnInit, OnChanges {
  @Input() category?: Category;
  @Output() save = new EventEmitter<CreateCategoryDto | UpdateCategoryDto>();
  @Output() cancelled = new EventEmitter<void>();

  public readonly config = CategoryFormConfig;
  public labels: any = {};

  constructor(
    public viewModel: CategoryFormViewModel,
    private translateProvider: TranslateProvider
  ) {}

  ngOnInit(): void {
    this.setupI18n();
    if (this.category) {
      this.viewModel.loadCategory(this.category);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && this.category) {
      this.viewModel.loadCategory(this.category);
    }
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.labels = this.translateProvider.getObject(this.config.i18n.view);
  }

  onSave(): void {
    if (this.viewModel.isValid()) {
      const formValue = this.viewModel.getFormValue();
      if (this.category) {
        this.save.emit({
          ...formValue,
          id: this.category.id,
        } as UpdateCategoryDto);
      } else {
        this.save.emit(formValue as CreateCategoryDto);
      }
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  selectColor(color: string): void {
    this.viewModel.form.patchValue({ color });
  }

  selectIcon(icon: string): void {
    this.viewModel.form.patchValue({ icon });
  }
}
