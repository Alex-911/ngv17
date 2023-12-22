import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  http = inject(HttpClient);

  getTodos() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos?_limit=2');
  }
}
