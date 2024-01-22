// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'crudapp';
// }
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoService, Todo } from './services/todo.service';
import { AddTaskComponent } from './MyComponents/add-task/add-task.component';
import { TaskListComponent } from './MyComponents/task-list/task-list.component';
import { MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    FormsModule,
    MatInputModule,
    MatFormField,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    AddTaskComponent,
    TaskListComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService],
})
export class AppComponent implements OnInit {
  newTask: string = '';
  tasks: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  addTask(newTask: string) {
    if (newTask.trim() !== '') {
      const newTodo: Todo = {
        id: this.tasks.length + 1,
        title: newTask,
        completed: false,
        editMode: false,
      };

      this.todoService.addTask(newTodo).subscribe(
        (addedTask: Todo) => {
          this.tasks.push(addedTask);
          console.log('Task added:', addedTask);
        },
        (error: any) => {
          console.error('Error adding task:', error);
        }
      );
    }
  }

  fetchData() {
    this.todoService.fetchData().subscribe(
      (data: Todo[]) => {
        this.tasks = data.map((item: Todo) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
          editMode: false,
        }));
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
