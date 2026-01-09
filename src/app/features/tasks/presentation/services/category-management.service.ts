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

  /**
   * Obtiene todas las categorías
   */
  public getCategories(): Observable<Category[]> {
    return this.categoryInteractor.getCategories();
  }

  /**
   * Crea una nueva categoría
   */
  public createCategory(categoryDto: CreateCategoryDto): Observable<Category> {
    return this.categoryInteractor.createCategory(categoryDto);
  }

  /**
   * Actualiza una categoría existente
   */
  public updateCategory(categoryDto: UpdateCategoryDto): Observable<Category> {
    return this.categoryInteractor.updateCategory(categoryDto);
  }

  /**
   * Elimina una categoría
   */
  public deleteCategory(categoryId: string): Observable<void> {
    return this.categoryInteractor.deleteCategory(categoryId);
  }

  /**
   * Crea un mapa de categorías por ID para búsqueda rápida
   */
  public createCategoriesMap(categories: Category[]): Map<string, Category> {
    return new Map(categories.map((c) => [c.id, c]));
  }

  /**
   * Obtiene una categoría por ID desde un mapa
   */
  public getCategoryById(
    categoriesMap: Map<string, Category>,
    categoryId: string | undefined
  ): Category | undefined {
    return categoryId ? categoriesMap.get(categoryId) : undefined;
  }

  /**
   * Verifica si un DTO es de actualización
   */
  public isUpdateDto(
    dto: CreateCategoryDto | UpdateCategoryDto
  ): dto is UpdateCategoryDto {
    return 'id' in dto;
  }
}
