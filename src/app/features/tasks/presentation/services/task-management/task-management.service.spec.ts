import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskManagementService } from './task-management.service';
import { TaskInteractor } from '@features/tasks/core/interactors/task.interactor';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '@features/tasks/core/domain/entities/task.entity';

describe('TaskManagementService', () => {
  let service: TaskManagementService;
  let taskInteractor: jasmine.SpyObj<TaskInteractor>;

  beforeEach(() => {
    const interactorSpy = jasmine.createSpyObj('TaskInteractor', [
      'getTasks',
      'createTask',
      'updateTask',
      'deleteTask',
      'toggleTaskCompleted',
    ]);

    TestBed.configureTestingModule({
      providers: [
        TaskManagementService,
        { provide: TaskInteractor, useValue: interactorSpy },
      ],
    });

    service = TestBed.inject(TaskManagementService);
    taskInteractor = TestBed.inject(
      TaskInteractor
    ) as jasmine.SpyObj<TaskInteractor>;
  });

  it('Given the TaskManagementService, When it is created, Then it should be truthy', () => {
    // Arrange & Act

    // Assert
    expect(service).toBeTruthy();
  });

  describe('getTasks', () => {
    it('Given the service, When getTasks is called, Then it should return observable of tasks', (done) => {
      // Arrange
      const mockTasks: Task[] = [
        { id: '1', title: 'Task 1', completed: false } as Task,
        { id: '2', title: 'Task 2', completed: true } as Task,
      ];
      taskInteractor.getTasks.and.returnValue(of(mockTasks));

      // Act
      service.getTasks().subscribe((tasks) => {
        // Assert
        expect(tasks).toEqual(mockTasks);
        expect(tasks.length).toBe(2);
        expect(taskInteractor.getTasks).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('createTask', () => {
    it('Given a CreateTaskDto, When createTask is called, Then it should create and return the task', (done) => {
      // Arrange
      const dto: CreateTaskDto = {
        title: 'New Task',
        description: 'Description',
      };
      const createdTask: Task = {
        id: '1',
        ...dto,
        completed: false,
      } as Task;
      taskInteractor.createTask.and.returnValue(of(createdTask));

      // Act
      service.createTask(dto).subscribe((task) => {
        // Assert
        expect(task).toEqual(createdTask);
        expect(taskInteractor.createTask).toHaveBeenCalledWith(dto);
        done();
      });
    });
  });

  describe('updateTask', () => {
    it('Given an UpdateTaskDto, When updateTask is called, Then it should update and return the task', (done) => {
      // Arrange
      const dto: UpdateTaskDto = {
        id: '1',
        title: 'Updated Task',
        completed: true,
      };
      const updatedTask: Task = { ...dto } as Task;
      taskInteractor.updateTask.and.returnValue(of(updatedTask));

      // Act
      service.updateTask(dto).subscribe((task) => {
        // Assert
        expect(task).toEqual(updatedTask);
        expect(taskInteractor.updateTask).toHaveBeenCalledWith(dto);
        done();
      });
    });
  });

  describe('deleteTask', () => {
    it('Given a task id, When deleteTask is called, Then it should delete the task', (done) => {
      // Arrange
      const taskId = '1';
      taskInteractor.deleteTask.and.returnValue(of(void 0));

      // Act
      service.deleteTask(taskId).subscribe(() => {
        // Assert
        expect(taskInteractor.deleteTask).toHaveBeenCalledWith(taskId);
        done();
      });
    });
  });

  describe('toggleTaskCompleted', () => {
    it('Given a task id, When toggleTaskCompleted is called, Then it should toggle the task completion status', (done) => {
      // Arrange
      const taskId = '1';
      const toggledTask: Task = {
        id: taskId,
        title: 'Task',
        completed: true,
      } as Task;
      taskInteractor.toggleTaskCompleted.and.returnValue(of(toggledTask));

      // Act
      service.toggleTaskCompleted(taskId).subscribe((task) => {
        // Assert
        expect(task).toEqual(toggledTask);
        expect(taskInteractor.toggleTaskCompleted).toHaveBeenCalledWith(taskId);
        done();
      });
    });
  });

  describe('toggleSubTask', () => {
    it('Given task and subtask ids, When toggleSubTask is called, Then it should toggle the subtask completion', (done) => {
      // Arrange
      const taskId = '1';
      const subTaskId = 'sub1';
      const mockTask: Task = {
        id: taskId,
        title: 'Task',
        completed: false,
        subTasks: [{ id: subTaskId, title: 'SubTask', completed: false }],
      } as Task;
      const updatedTask: Task = {
        ...mockTask,
        subTasks: [{ id: subTaskId, title: 'SubTask', completed: true }],
      };
      taskInteractor.getTasks.and.returnValue(of([mockTask]));
      taskInteractor.updateTask.and.returnValue(of(updatedTask));

      // Act
      service.toggleSubTask(taskId, subTaskId).subscribe((task) => {
        // Assert
        expect(task).toEqual(updatedTask);
        expect(taskInteractor.getTasks).toHaveBeenCalled();
        expect(taskInteractor.updateTask).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('isUpdateDto', () => {
    it('Given a dto with id, When isUpdateDto is called, Then it should return true', () => {
      // Arrange
      const dto: UpdateTaskDto = {
        id: '1',
        title: 'Task',
        completed: false,
      };

      // Act
      const result = service.isUpdateDto(dto);

      // Assert
      expect(result).toBe(true);
    });

    it('Given a dto without id, When isUpdateDto is called, Then it should return false', () => {
      // Arrange
      const dto: CreateTaskDto = {
        title: 'Task',
      };

      // Act
      const result = service.isUpdateDto(dto);

      // Assert
      expect(result).toBe(false);
    });
  });
});
