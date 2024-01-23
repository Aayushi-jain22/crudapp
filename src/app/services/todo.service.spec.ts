// import { TestBed } from '@angular/core/testing';

// import { TodoService } from './todo.service';

// describe('TodoService', () => {
//   let service: TodoService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(TodoService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data', () => {
    const testData = [
      { id: 1, title: 'Test Task', completed: false, editMode: false },
    ];

    service.fetchData().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should add a task', () => {
    const newTask = {
      id: 2,
      title: 'New Task',
      completed: false,
      editMode: false,
    };

    service.addTask(newTask).subscribe((task) => {
      expect(task).toEqual(newTask);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should delete a task', () => {
    const taskId = 1;

    service.deleteTask(taskId).subscribe(() => {
      // no specific expectation for delete
    });

    const req = httpTestingController.expectOne(
      `${service['apiUrl']}/${taskId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a task', () => {
    const taskId = 1;
    const updatedTask = {
      id: 1,
      title: 'Updated Task',
      completed: true,
      editMode: false,
    };

    service.updateTask(taskId, updatedTask).subscribe((task) => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpTestingController.expectOne(
      `${service['apiUrl']}/${taskId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });
});
