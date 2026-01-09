import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { CategoryRepository } from '@features/tasks/core/domain/repositories/category.repository';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';
import { LocalStorageDataSource } from '@features/tasks/data/datasources/local-storage.datasource';
import { CategoryMapper } from '../mappers/category.mapper';

@Injectable({
  providedIn: 'root',
})
export class CategoryRepositoryImpl extends CategoryRepository {
  constructor(private dataSource: LocalStorageDataSource) {
    super();
  }

  getAll(): Observable<Category[]> {
    return this.dataSource.getCategories();
  }

  getById(id: string): Observable<Category | null> {
    return this.dataSource.getCategories().pipe(
      take(1),
      map((categories) => categories.find((cat) => cat.id === id) || null)
    );
  }

  create(categoryDto: CreateCategoryDto): Observable<Category> {
    return this.dataSource.getCategories().pipe(
      take(1),
      map((categories) => {
        const newCategory = CategoryMapper.fromCreateDto(categoryDto);
        const updatedCategories = [...categories, newCategory];
        this.dataSource.saveCategories(updatedCategories);
        return newCategory;
      })
    );
  }

  update(categoryDto: UpdateCategoryDto): Observable<Category> {
    return this.dataSource.getCategories().pipe(
      take(1),
      map((categories) => {
        const index = categories.findIndex((cat) => cat.id === categoryDto.id);
        if (index === -1) {
          throw new Error('Category not found');
        }
        const updatedCategory = CategoryMapper.fromUpdateDto(
          categories[index],
          categoryDto
        );
        const updatedCategories = [...categories];
        updatedCategories[index] = updatedCategory;
        this.dataSource.saveCategories(updatedCategories);
        return updatedCategory;
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.dataSource.getCategories().pipe(
      take(1),
      map((categories) => {
        const updatedCategories = categories.filter((cat) => cat.id !== id);
        this.dataSource.saveCategories(updatedCategories);
      })
    );
  }
}
