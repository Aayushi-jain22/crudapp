// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { TaskListComponent } from './task-list.component';

// describe('TaskListComponent', () => {
//   let component: TaskListComponent;
//   let fixture: ComponentFixture<TaskListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [TaskListComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(TaskListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import NoopAnimationsModule
import { TaskListComponent } from './task-list.component';
import { TodoService } from '../../services/todo.service';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    todoService = jasmine.createSpyObj('TodoService', [
      'deleteTask',
      'updateTask',
    ]);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatButtonModule,
        MatTableModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: TodoService, useValue: todoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;

    component.tasks = [
      { id: 1, title: 'Task 1', completed: false, editMode: false },
      { id: 2, title: 'Task 2', completed: false, editMode: false },
      // Add more tasks as needed
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteTask when delete button is clicked', fakeAsync(() => {
    const index = 0;

    // Mock the deleteTask method in the service
    todoService.deleteTask.and.returnValue(of(undefined));

    // Trigger the deleteTask method
    component.deleteTask(index);

    // Wait for the asynchronous operation to complete
    tick();

    expect(todoService.deleteTask).toHaveBeenCalledWith(
      component.tasks[index].id
    );
  }));

  it('should call updateTask when save button is clicked', fakeAsync(() => {
    const index = 0;

    todoService.updateTask.and.returnValue(of(component.tasks[index]));

    // Trigger the saveTask method
    component.saveTask(index);

    // Wait for the asynchronous operation to complete
    tick();

    expect(todoService.updateTask).toHaveBeenCalledWith(
      component.tasks[index].id,
      component.tasks[index]
    );
  }));

  it('should toggle edit mode when edit button is clicked', fakeAsync(() => {
    const index = 0;

    expect(component.tasks[index].editMode).toBeFalsy();

    // Trigger the toggleEditMode method
    component.toggleEditMode(index);

    // Wait for the asynchronous operation to complete
    tick();

    // After toggle, editMode should be true
    expect(component.tasks[index].editMode).toBeTruthy();
  }));

  it('should toggle task completion when mark completed button is clicked', fakeAsync(() => {
    const index = 0;

    // Mock the markCompleted method in the service
    todoService.updateTask.and.returnValue(of(component.tasks[index]));

    // Trigger the markCompleted method
    component.markCompleted(index);

    // Wait for the asynchronous operation to complete
    tick();

    // After toggle, completed status should be true
    expect(component.tasks[index].completed).toBeTruthy();
  }));
});
