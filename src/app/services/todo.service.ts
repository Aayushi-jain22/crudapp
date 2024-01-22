// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TodoService {

//   constructor() { }
// }
// todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  editMode: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  fetchData(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTask(task: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, task);
  }

  deleteTask(id: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }

  updateTask(id: number, task: Todo): Observable<Todo> {
    const updateUrl = `${this.apiUrl}/${id}`;
    return this.http.put<Todo>(updateUrl, task);
  }
}
