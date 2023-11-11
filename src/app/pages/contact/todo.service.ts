import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ContactService } from './contact.service';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  userService = inject(ContactService);

  todosUrl = 'https://jsonplaceholder.typicode.com/todos?userId=';

  userTodos = signal<Todo[]>([]);

  loading = signal<boolean>(false);

  private observableTodos$ = toObservable(this.userService.selectedUser).pipe(
    map((d) => {
      this.loading.set(true);
      return d;
    }),
    switchMap((user) =>
      this.http.get<Todo[]>(this.todosUrl + user?.id).pipe(
        tap((d) => {
          this.userTodos.set(d);
          this.loading.set(false);
        }),
        catchError(() => of<Todo[]>([]))
      )
    )
  );

  readOnlyTodos = toSignal<Todo[], Todo[]>(this.observableTodos$, {
    initialValue: [],
  });

  markComplete(todo: Todo) {
    this.userTodos.update((todos) =>
      todos.map((t) => (t.id === todo.id ? { ...t, completed: true } : t))
    );
  }
}
