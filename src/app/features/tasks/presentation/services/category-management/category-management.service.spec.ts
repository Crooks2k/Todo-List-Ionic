import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CategoryManagementService } from './category-management.service';
import { CategoryInteractor } from '@features/tasks/core/interactors/category.interactor';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';

describe('CategoryManagementService', () => {
  let service: CategoryManagementService;
  let categoryInteractor: jasmine.SpyObj<CategoryInteractor>;

  beforeEach(() => {
    const interactorSpy = jasmine.createSpyObj('CategoryInteractor', [
      'getCategories',
      'createCategory',
      'updateCategory',
      'deleteCategory',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CategoryManagementService,
        { provide: CategoryInteractor, useValue: interactorSpy },
      ],
    });

    service = TestBed.inject(CategoryManagementService);
    categoryInteractor = TestBed.inject(
      CategoryInteractor
    ) as jasmine.SpyObj<CategoryInteractor>;
  });

  it('Given the CategoryManagementService, When it is created, Then it should be truthy', () => {
    // Assert
    expect(service).toBeTruthy();
  });

  describe('getCategories', () => {
    it('Given the service, When getCategories is called, Then it should return observable of categories', (done) => {
      // Arrange
      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Work',
          color: '#FF0000',
          icon: 'briefcase',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Personal',
          color: '#00FF00',
          icon: 'home',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      categoryInteractor.getCategories.and.returnValue(of(mockCategories));

      // Act
      service.getCategories().subscribe((categories) => {
        // Assert
        expect(categories).toEqual(mockCategories);
        expect(categories.length).toBe(2);
        expect(categoryInteractor.getCategories).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('createCategory', () => {
    it('Given a CreateCategoryDto, When createCategory is called, Then it should create and return the category', (done) => {
      // Arrange
      const dto: CreateCategoryDto = {
        name: 'New Category',
        color: '#0000FF',
        icon: 'star',
      };
      const createdCategory: Category = {
        id: '1',
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      categoryInteractor.createCategory.and.returnValue(of(createdCategory));

      // Act
      service.createCategory(dto).subscribe((category) => {
        // Assert
        expect(category).toEqual(createdCategory);
        expect(categoryInteractor.createCategory).toHaveBeenCalledWith(dto);
        done();
      });
    });
  });

  describe('updateCategory', () => {
    it('Given an UpdateCategoryDto, When updateCategory is called, Then it should update and return the category', (done) => {
      // Arrange
      const dto: UpdateCategoryDto = {
        id: '1',
        name: 'Updated Category',
        color: '#FF00FF',
        icon: 'heart',
      };
      const updatedCategory: Category = {
        id: dto.id,
        name: dto.name!,
        color: dto.color!,
        icon: dto.icon!,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      categoryInteractor.updateCategory.and.returnValue(of(updatedCategory));

      // Act
      service.updateCategory(dto).subscribe((category) => {
        // Assert
        expect(category).toEqual(updatedCategory);
        expect(categoryInteractor.updateCategory).toHaveBeenCalledWith(dto);
        done();
      });
    });
  });

  describe('deleteCategory', () => {
    it('Given a category id, When deleteCategory is called, Then it should delete the category', (done) => {
      // Arrange
      const categoryId = '1';
      categoryInteractor.deleteCategory.and.returnValue(of(void 0));

      // Act
      service.deleteCategory(categoryId).subscribe(() => {
        // Assert
        expect(categoryInteractor.deleteCategory).toHaveBeenCalledWith(
          categoryId
        );
        done();
      });
    });
  });

  describe('createCategoriesMap', () => {
    it('Given an array of categories, When createCategoriesMap is called, Then it should return a Map with categories by id', () => {
      // Arrange
      const categories: Category[] = [
        {
          id: '1',
          name: 'Work',
          color: '#FF0000',
          icon: 'briefcase',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Personal',
          color: '#00FF00',
          icon: 'home',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Act
      const result = service.createCategoriesMap(categories);

      // Assert
      expect(result instanceof Map).toBe(true);
      expect(result.size).toBe(2);
      expect(result.get('1')).toEqual(categories[0]);
      expect(result.get('2')).toEqual(categories[1]);
    });

    it('Given an empty array, When createCategoriesMap is called, Then it should return an empty Map', () => {
      // Arrange
      const categories: Category[] = [];

      // Act
      const result = service.createCategoriesMap(categories);

      // Assert
      expect(result instanceof Map).toBe(true);
      expect(result.size).toBe(0);
    });
  });

  describe('getCategoryById', () => {
    it('Given a categories map and valid id, When getCategoryById is called, Then it should return the category', () => {
      // Arrange
      const categories: Category[] = [
        {
          id: '1',
          name: 'Work',
          color: '#FF0000',
          icon: 'briefcase',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Personal',
          color: '#00FF00',
          icon: 'home',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const categoriesMap = service.createCategoriesMap(categories);

      // Act
      const result = service.getCategoryById(categoriesMap, '1');

      // Assert
      expect(result).toEqual(categories[0]);
    });

    it('Given a categories map and invalid id, When getCategoryById is called, Then it should return undefined', () => {
      // Arrange
      const categories: Category[] = [
        {
          id: '1',
          name: 'Work',
          color: '#FF0000',
          icon: 'briefcase',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const categoriesMap = service.createCategoriesMap(categories);

      // Act
      const result = service.getCategoryById(categoriesMap, 'invalid');

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe('isUpdateDto', () => {
    it('Given a dto with id, When isUpdateDto is called, Then it should return true', () => {
      // Arrange
      const dto: UpdateCategoryDto = {
        id: '1',
        name: 'Category',
        color: '#FF0000',
        icon: 'star',
      };

      // Act
      const result = service.isUpdateDto(dto);

      // Assert
      expect(result).toBe(true);
    });

    it('Given a dto without id, When isUpdateDto is called, Then it should return false', () => {
      // Arrange
      const dto: CreateCategoryDto = {
        name: 'Category',
        color: '#FF0000',
        icon: 'star',
      };

      // Act
      const result = service.isUpdateDto(dto);

      // Assert
      expect(result).toBe(false);
    });
  });
});
