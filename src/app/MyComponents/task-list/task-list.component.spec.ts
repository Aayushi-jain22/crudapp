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

import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      //   declarations: [TaskListComponent],
      imports: [
        FormsModule,
        MatButtonModule,
        MatTableModule,
        BrowserAnimationsModule,
        TaskListComponent,
        NoopAnimationsModule,
      ],
      providers: [{ provide: TodoService, useValue: todoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteTask when delete button is clicked', () => {
    const index = 0;

    // Mock the deleteTask method in the service
    todoService.deleteTask.and.returnValue(of(undefined));

    // Trigger the deleteTask method
    component.deleteTask(index);

    expect(todoService.deleteTask).toHaveBeenCalledWith(
      component.tasks[index].id
    );
  });

  it('should call updateTask when save button is clicked', () => {
    const index = 0;

    todoService.updateTask.and.returnValue(of(component.tasks[index]));

    component.saveTask(index);

    expect(todoService.updateTask).toHaveBeenCalledWith(
      component.tasks[index].id,
      component.tasks[index]
    );
  });

  it('should toggle edit mode when edit button is clicked', () => {
    const index = 0;

    expect(component.tasks[index].editMode).toBeFalsy();

    component.toggleEditMode(index);

    // After toggle, editMode should be true
    expect(component.tasks[index].editMode).toBeTruthy();
  });

  it('should toggle task completion when mark completed button is clicked', () => {
    const index = 0;

    // Initial completed status should be false
    expect(component.tasks[index].completed).toBeFalsy();

    // Trigger the markCompleted method
    component.markCompleted(index);

    // After toggle, completed status should be true
    expect(component.tasks[index].completed).toBeTruthy();
  });
});
