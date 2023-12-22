import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { TodosService } from '@/app/pages/todos/todos.service';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const TodoStore = signalStore(
  withState<TodoState>({
    todos: [],
    loading: false,
    error: null,
  }),
  withComputed((store) => ({
    totalCount: computed(() => store.todos().length),
    completedCount: computed(
      () => store.todos().filter((t) => t.completed).length
    ),
    pendingCount: computed(
      () => store.todos().filter((t) => !t.completed).length
    ),
  })),
  withMethods((store, todoService = inject(TodosService)) => ({
    addTodo: (title: string) => {
      const todo: Todo = {
        id: crypto.randomUUID(),
        title: title,
        completed: false,
      };
      const updatedTodoList = [...store.todos(), todo];
      patchState(store, { todos: updatedTodoList });
    },
    toggleTodo: (id: string) => {
      const updatedTodoList = store
        .todos()
        .map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      patchState(store, { todos: updatedTodoList });
    },
    deleteTodo: (id: string) => {
      const updatedTodoList = store.todos().filter((t) => t.id !== id);
      patchState(store, { todos: updatedTodoList });
    },
    loadTodos: rxMethod<void>(
      pipe(
        switchMap(() => {
          return todoService.getTodos().pipe(
            tap((d) => {
              patchState(store, { todos: d as Todo[] });
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit: (store) => {
      store.loadTodos();
    },
  })
);
