// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-task',
//   standalone: true,
//   imports: [],
//   templateUrl: './add-task.component.html',
//   styleUrl: './add-task.component.css'
// })
// export class AddTaskComponent {

// }
// add-task.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, NgFor, NgIf],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter<string>();
  newTask: string = '';

  addTask() {
    if (this.newTask.trim() !== '') {
      this.taskAdded.emit(this.newTask);
      this.newTask = ''; // Clear the input after emitting the event
    }
  }
}
