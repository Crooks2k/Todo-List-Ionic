import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryRepository } from '@features/tasks/core/domain/repositories/category.repository';
import {
  Category,
  CreateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';

@Injectable({
  providedIn: 'root',
})
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(category: CreateCategoryDto): Observable<Category> {
    return this.categoryRepository.create(category);
  }
}
