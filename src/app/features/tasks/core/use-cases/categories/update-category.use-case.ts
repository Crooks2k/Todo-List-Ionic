import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryRepository } from '@features/tasks/core/domain/repositories/category.repository';
import {
  Category,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';

@Injectable({
  providedIn: 'root',
})
export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(category: UpdateCategoryDto): Observable<Category> {
    return this.categoryRepository.update(category);
  }
}
