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
import { CategoryFormConfig } from '../category-form.config';

@Injectable()
export class CategoryFormViewModel {
  form: FormGroup;

  readonly colorPalette = CATEGORY_COLORS;
  readonly iconOptions = CATEGORY_ICONS;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      [CategoryFormConfig.formFields.name]: [
        '',
        [
          Validators.required,
          Validators.minLength(CategoryFormConfig.validation.nameMinLength),
        ],
      ],
      [CategoryFormConfig.formFields.color]: [
        DEFAULT_CATEGORY_COLOR,
        Validators.required,
      ],
      [CategoryFormConfig.formFields.icon]: [DEFAULT_CATEGORY_ICON],
    });
  }

  loadCategory(category: Category): void {
    this.form.patchValue({
      [CategoryFormConfig.formFields.name]: category.name,
      [CategoryFormConfig.formFields.color]: category.color,
      [CategoryFormConfig.formFields.icon]: category.icon,
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
      [CategoryFormConfig.formFields.name]: '',
      [CategoryFormConfig.formFields.color]: DEFAULT_CATEGORY_COLOR,
      [CategoryFormConfig.formFields.icon]: DEFAULT_CATEGORY_ICON,
    });
  }
}
