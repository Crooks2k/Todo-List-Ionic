import { Observable } from 'rxjs';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';

export abstract class CategoryRepository {
  abstract getAll(): Observable<Category[]>;
  abstract getById(id: string): Observable<Category | null>;
  abstract create(category: CreateCategoryDto): Observable<Category>;
  abstract update(category: UpdateCategoryDto): Observable<Category>;
  abstract delete(id: string): Observable<void>;
}
