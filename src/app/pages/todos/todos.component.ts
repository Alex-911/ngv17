import { Component, inject } from '@angular/core';
import { TodoStore } from './state';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [TodoStore],
  template: `
    <div class="flex items-center justify-center">
      <div
        class="flex flex-col items-stretch justify-start gap-5 rounded-xl shadow-lg p-10 bg-white m-5"
      >
        <h1 class="text-center text-2xl">Todos</h1>
        <div class="flex items-center justify-center text-sm font-semibold gap-5 ">
          <h1>Total: {{ store.totalCount() }}</h1>
          <h1>Completed: {{ store.completedCount() }}</h1>
          <h1>Pending: {{ store.pendingCount() }}</h1>
        </div>

        <form
          [formGroup]="form"
          (submit)="onSubmit()"
          class="flex items-center justify-center w-96 "
        >
          <input
            type="text"
            formControlName="title"
            placeholder="Enter you todo"
            class="border-2 rounded-md border-fuchsia-500 text-xl rounded-r-none placeholder:text-xl placeholder:p-2 p-2"
          />
          <button
            type="submit"
            class="rounded-md rounded-l-none p-2 bg-pink-600 text-xl"
          >
            Add
          </button>
        </form>

        <div
          class="flex flex-col items-stretch justify-start gap-3 overflow-y-auto h-96"
        >
          @for (todo of store.todos(); track todo.id) {
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center justify-start gap-2">
              <input
                type="checkbox"
                [checked]="todo.completed"
                (click)="store.toggleTodo(todo.id)"
                class="checked:bg-pink-600 bg-fuchsia-600"
              />
              <h2 (click)="store.toggleTodo(todo.id)">{{ todo.title }}</h2>
            </div>
            <button type="button" (click)="store.deleteTodo(todo.id)">
              ❌
            </button>
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class TodosComponent {
  store = inject(TodoStore);
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.min(2),
    ]),
  });

  onSubmit() {
    console.log('Submitted');
    const title = this.form.getRawValue().title;
    if (title) {
      this.store.addTodo(title);
    }
    this.form.reset();
  }
}
