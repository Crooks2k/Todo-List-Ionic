export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryDto {
  name: string;
  color: string;
  icon?: string;
}

export interface UpdateCategoryDto {
  id: string;
  name?: string;
  color?: string;
  icon?: string;
}
