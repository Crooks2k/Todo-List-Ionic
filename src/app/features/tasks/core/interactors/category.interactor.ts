import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';
import { GetCategoriesUseCase } from '@features/tasks/core/use-cases/categories/get-categories.use-case';
import { CreateCategoryUseCase } from '@features/tasks/core/use-cases/categories/create-category.use-case';
import { UpdateCategoryUseCase } from '@features/tasks/core/use-cases/categories/update-category.use-case';
import { DeleteCategoryUseCase } from '@features/tasks/core/use-cases/categories/delete-category.use-case';

@Injectable()
export class CategoryInteractor {
  constructor(
    private getCategoriesUseCase: GetCategoriesUseCase,
    private createCategoryUseCase: CreateCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase
  ) {}

  getCategories(): Observable<Category[]> {
    return this.getCategoriesUseCase.execute();
  }

  createCategory(categoryDto: CreateCategoryDto): Observable<Category> {
    return this.createCategoryUseCase.execute(categoryDto);
  }

  updateCategory(categoryDto: UpdateCategoryDto): Observable<Category> {
    return this.updateCategoryUseCase.execute(categoryDto);
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.deleteCategoryUseCase.execute(categoryId);
  }
}
