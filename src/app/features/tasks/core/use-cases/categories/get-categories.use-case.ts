import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryRepository } from '@features/tasks/core/domain/repositories/category.repository';
import { Category } from '@features/tasks/core/domain/entities/category.entity';

@Injectable({
  providedIn: 'root',
})
export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(): Observable<Category[]> {
    return this.categoryRepository.getAll();
  }
}
