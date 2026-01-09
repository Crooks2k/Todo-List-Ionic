import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryRepository } from '@features/tasks/core/domain/repositories/category.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(id: string): Observable<void> {
    return this.categoryRepository.delete(id);
  }
}
