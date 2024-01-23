// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AddTaskComponent } from './add-task.component';

// describe('AddTaskComponent', () => {
//   let component: AddTaskComponent;
//   let fixture: ComponentFixture<AddTaskComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AddTaskComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(AddTaskComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EventEmitter } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import NoopAnimationsModule

import { AddTaskComponent } from './add-task.component';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
      ], // Include NoopAnimationsModule
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit taskAdded event when addTask is called with a non-empty task', () => {
    const task = 'Test Task';
    const spy = spyOn(component.taskAdded, 'emit');

    component.newTask = task;
    component.addTask();

    expect(spy).toHaveBeenCalledWith(task);
  });

  it('should not emit taskAdded event when addTask is called with an empty task', () => {
    const spy = spyOn(component.taskAdded, 'emit');

    component.newTask = '';
    component.addTask();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should clear newTask after emitting taskAdded event', () => {
    const task = 'Test Task';

    component.newTask = task;
    component.addTask();

    expect(component.newTask).toEqual('');
  });
});
