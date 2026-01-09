import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';

export class CategoryMapper {
  static fromCreateDto(dto: CreateCategoryDto): Category {
    return {
      id: this.generateId(),
      name: dto.name,
      color: dto.color,
      icon: dto.icon,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static fromUpdateDto(
    existingCategory: Category,
    dto: UpdateCategoryDto
  ): Category {
    return {
      ...existingCategory,
      ...dto,
      updatedAt: new Date(),
    };
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
