// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppComponent],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have the 'crudapp' title`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('crudapp');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('h1')?.textContent).toContain('Hello, crudapp');
//   });
// });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { AppComponent } from './app.component';
// import { AddTaskComponent } from './MyComponents/add-task/add-task.component';
// import { TaskListComponent } from './MyComponents/task-list/task-list.component';
// import { TodoService, Todo } from './services/todo.service';
// import { of } from 'rxjs';

// fdescribe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       imports: [
//         FormsModule,
//         HttpClientModule,
//         AddTaskComponent,
//         TaskListComponent,
//       ],
//       providers: [TodoService],
//     });
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should add task on addTask()', () => {
//     spyOn(component['todoService'], 'addTask').and.returnValue(
//       of({} as Todo) // Use of() to create an Observable that emits an empty object
//     );

//     component.addTask('New Task');

//     expect(component['todoService'].addTask).toHaveBeenCalled();
//     expect(component.tasks.length).toBe(1);
//   });

//   it('should not add task if newTask is empty on addTask()', () => {
//     spyOn(component['todoService'], 'addTask').and.returnValue(
//       of({} as Todo) // Use of() to create an Observable that emits an empty object
//     );

//     component.addTask('');

//     expect(component['todoService'].addTask).not.toHaveBeenCalled();
//     expect(component.tasks.length).toBe(0);
//   });

//   it('should fetch data on ngOnInit()', () => {
//     spyOn(component['todoService'], 'fetchData').and.returnValue(
//       of([] as Todo[]) // Use of() to create an Observable that emits an empty array
//     );

//     component.ngOnInit();

//     expect(component['todoService'].fetchData).toHaveBeenCalled();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    todoServiceSpy = jasmine.createSpyObj('TodoService', [
      'addTask',
      'fetchData',
    ]);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: TodoService, useValue: todoServiceSpy }],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a task', () => {
    const newTask = 'New Task';
    const addedTask = {
      id: 1,
      title: newTask,
      completed: false,
      editMode: false,
    };

    todoServiceSpy.addTask.and.returnValue(of(addedTask));

    component.addTask(newTask);

    expect(todoServiceSpy.addTask).toHaveBeenCalledWith({
      id: component.tasks.length + 1,
      title: newTask,
      completed: false,
      editMode: false,
    });
    expect(component.tasks.length).toBe(1);
  });

  it('should fetch data on initialization', () => {
    const mockData = [
      { id: 1, title: 'Task 1', completed: false, editMode: false },
      { id: 2, title: 'Task 2', completed: true, editMode: false },
    ];

    todoServiceSpy.fetchData.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(todoServiceSpy.fetchData).toHaveBeenCalled();
    expect(component.tasks).toEqual([
      { id: 1, title: 'Task 1', completed: false, editMode: false },
      { id: 2, title: 'Task 2', completed: true, editMode: false },
    ]);
  });
});
