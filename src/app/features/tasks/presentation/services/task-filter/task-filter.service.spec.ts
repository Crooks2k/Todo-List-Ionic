import { TestBed } from '@angular/core/testing';
import { TaskFilterService } from './task-filter.service';
import { Task } from '@features/tasks/core/domain/entities/task.entity';

describe('TaskFilterService', () => {
  let service: TaskFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskFilterService],
    });
    service = TestBed.inject(TaskFilterService);
  });

  it('Given the TaskFilterService, When it is created, Then it should be truthy', () => {
    // Assert
    expect(service).toBeTruthy();
  });

  describe('applyFilters', () => {
    it('Given tasks and no filters, When applyFilters is called with "all" tab, Then it should return all active tasks', () => {
      // Arrange
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          completed: false,
          categoryId: 'cat1',
        } as Task,
        {
          id: '2',
          title: 'Task 2',
          completed: true,
          categoryId: 'cat1',
        } as Task,
        {
          id: '3',
          title: 'Task 3',
          completed: false,
          categoryId: 'cat2',
        } as Task,
      ];

      // Act
      const result = service.applyFilters(tasks, [], 'all');

      // Assert
      expect(result.length).toBe(2);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('3');
    });

    it('Given tasks, When applyFilters is called with "completed" tab, Then it should return only completed tasks', () => {
      // Arrange
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          completed: false,
          categoryId: 'cat1',
        } as Task,
        {
          id: '2',
          title: 'Task 2',
          completed: true,
          categoryId: 'cat1',
        } as Task,
        {
          id: '3',
          title: 'Task 3',
          completed: true,
          categoryId: 'cat2',
        } as Task,
      ];

      // Act
      const result = service.applyFilters(tasks, [], 'completed');

      // Assert
      expect(result.length).toBe(2);
      expect(result[0].id).toBe('2');
      expect(result[1].id).toBe('3');
      expect(result.every((task) => task.completed)).toBe(true);
    });

    it('Given tasks with due dates, When applyFilters is called with "overdue" tab, Then it should return only overdue tasks', () => {
      // Arrange
      const pastDate = new Date('2020-01-01');
      const futureDate = new Date('2030-01-01');
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          completed: false,
          dueDate: pastDate,
          categoryId: 'cat1',
        } as Task,
        {
          id: '2',
          title: 'Task 2',
          completed: false,
          dueDate: futureDate,
          categoryId: 'cat1',
        } as Task,
        {
          id: '3',
          title: 'Task 3',
          completed: false,
          categoryId: 'cat2',
        } as Task,
      ];

      // Act
      const result = service.applyFilters(tasks, [], 'overdue');

      // Assert
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });

    it('Given tasks and category filters, When applyFilters is called, Then it should return only tasks from selected categories', () => {
      // Arrange
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          completed: false,
          categoryId: 'cat1',
        } as Task,
        {
          id: '2',
          title: 'Task 2',
          completed: false,
          categoryId: 'cat2',
        } as Task,
        {
          id: '3',
          title: 'Task 3',
          completed: false,
          categoryId: 'cat3',
        } as Task,
      ];
      const categoryIds = ['cat1', 'cat3'];

      // Act
      const result = service.applyFilters(tasks, categoryIds, 'all');

      // Assert
      expect(result.length).toBe(2);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('3');
    });

    it('Given empty tasks array, When applyFilters is called, Then it should return empty array', () => {
      // Arrange
      const tasks: Task[] = [];

      // Act
      const result = service.applyFilters(tasks, [], 'all');

      // Assert
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('Given tasks with multiple filters, When applyFilters is called with category and completed tab, Then it should apply both filters', () => {
      // Arrange
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          completed: true,
          categoryId: 'cat1',
        } as Task,
        {
          id: '2',
          title: 'Task 2',
          completed: false,
          categoryId: 'cat1',
        } as Task,
        {
          id: '3',
          title: 'Task 3',
          completed: true,
          categoryId: 'cat2',
        } as Task,
      ];
      const categoryIds = ['cat1'];

      // Act
      const result = service.applyFilters(tasks, categoryIds, 'completed');

      // Assert
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
      expect(result[0].completed).toBe(true);
      expect(result[0].categoryId).toBe('cat1');
    });
  });
});
