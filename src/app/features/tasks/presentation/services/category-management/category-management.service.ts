import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';
import { CategoryInteractor } from '@features/tasks/core/interactors/category.interactor';

@Injectable()
export class CategoryManagementService {
  constructor(private categoryInteractor: CategoryInteractor) {}

  public getCategories(): Observable<Category[]> {
    return this.categoryInteractor.getCategories();
  }

  public createCategory(categoryDto: CreateCategoryDto): Observable<Category> {
    return this.categoryInteractor.createCategory(categoryDto);
  }

  public updateCategory(categoryDto: UpdateCategoryDto): Observable<Category> {
    return this.categoryInteractor.updateCategory(categoryDto);
  }

  public deleteCategory(categoryId: string): Observable<void> {
    return this.categoryInteractor.deleteCategory(categoryId);
  }

  public createCategoriesMap(categories: Category[]): Map<string, Category> {
    return new Map(categories.map((c) => [c.id, c]));
  }

  public getCategoryById(
    categoriesMap: Map<string, Category>,
    categoryId: string | undefined
  ): Category | undefined {
    return categoryId ? categoriesMap.get(categoryId) : undefined;
  }

  public isUpdateDto(
    dto: CreateCategoryDto | UpdateCategoryDto
  ): dto is UpdateCategoryDto {
    return 'id' in dto;
  }
}
