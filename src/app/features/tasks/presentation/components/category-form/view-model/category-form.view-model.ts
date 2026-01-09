import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';
import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  DEFAULT_CATEGORY_COLOR,
  DEFAULT_CATEGORY_ICON,
} from '@features/tasks/core/constants';

@Injectable()
export class CategoryFormViewModel {
  form: FormGroup;

  readonly colorPalette = CATEGORY_COLORS;
  readonly iconOptions = CATEGORY_ICONS;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      color: [DEFAULT_CATEGORY_COLOR, Validators.required],
      icon: [DEFAULT_CATEGORY_ICON],
    });
  }

  loadCategory(category: Category): void {
    this.form.patchValue({
      name: category.name,
      color: category.color,
      icon: category.icon,
    });
  }

  getFormValue(): CreateCategoryDto | UpdateCategoryDto {
    return this.form.value;
  }

  isValid(): boolean {
    return this.form.valid;
  }

  reset(): void {
    this.form.reset({
      name: '',
      color: DEFAULT_CATEGORY_COLOR,
      icon: DEFAULT_CATEGORY_ICON,
    });
  }
}
