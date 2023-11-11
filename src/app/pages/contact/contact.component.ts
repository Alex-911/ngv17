import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService, User } from './contact.service';
import {
  RowModel,
  Table,
  TableState,
  Updater,
  createTable,
} from '@tanstack/table-core';
import { Todo, TodoService } from './todo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="h-[100dvh] flex flex-col items-stretch justify-start">
      <div class="flex items-center justify-start gap-2 p-2 text-2xl">
        <a routerLink="/">Home</a>
        <a routerLink="/about">About Us</a>
        <a routerLink="/contact">Contact</a>
      </div>

      <div class="flex items-start justify-start gap-2 flex-grow">
        @if (users()) {
        <div class="flex items-stretch justify-start flex-col gap-5 w-64 p-2">
          @for (user of users(); track $index) {
          <div
            class="p-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white"
            [ngClass]="{
              'bg-blue-500 text-white': user.id === selectedUser()?.id
            }"
            (click)="selectuser(user)"
          >
            <h3>{{ user.name }}</h3>
          </div>
          }
        </div>
        } @else {
        <p>No Data</p>
        }
        <div class="w-0.5 h-full border-l-2 border-blue-500 borr"></div>

        @defer {
        <div class="prose mx-auto min-w-fit">
          @if (selectedUser() !== undefined) { @if (table()) {
          <table class="w-96 h-96">
            <caption>
              {{
                tableCaption()
              }}
            </caption>
            <thead>
              <tr>
                @for (head of table().options.columns; track $index) {
                <th class="min-w-max">{{ head.header }}</th>
                }
              </tr>
            </thead>
            @if (loading()) {
            <tbody>
              <tr>
                <td>Loading....</td>
                <td></td>
              </tr>
            </tbody>
            } @else {
            <tbody class="h-96 overflow-y-scroll">
              @for (row of table().options.data; track $index) {
              <tr>
                <td class="min-w-max">{{ row.title }}</td>
                <td>
                  <button
                    type="button"
                    (click)="markComplete(row)"
                    [disabled]="row.completed"
                  >
                    @if (row.completed) {
                    {{ '' }}
                    } @else {
                    {{ 'Mark as Complete' }}
                    }
                  </button>
                </td>
              </tr>
              }
            </tbody>
            }
          </table>
          } } @else {
          <p>Please Select a user.</p>
          }
        </div>
        } @loading(after 100ms; minimum 1s) {
        <p>Loading</p>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ContactComponent {
  private contactService = inject(ContactService);
  private todoService = inject(TodoService);
  users = this.contactService.users;
  userTodos = this.todoService.userTodos;
  loading = this.todoService.loading;
  selectedUser = this.contactService.selectedUser;

  selectuser(user: User) {
    this.contactService.selectUser(user);
  }

  completedTodos = computed(
    () => this.userTodos().filter((t) => t.completed).length
  );

  tableCaption = computed(
    () => `${this.selectedUser()?.name} - ${this.completedTodos()} completed`
  );

  table = computed(() => {
    return createTable<Todo>({
      columns: [
        { accessorKey: 'title', header: 'Title' },
        { accessorKey: 'completed', header: 'Completed' },
      ],
      data: this.userTodos(),
      getCoreRowModel: function (table: Table<Todo>): () => RowModel<Todo> {
        return () => table.getRowModel();
      },
      onStateChange: function (updater: Updater<TableState>): void {},
      renderFallbackValue: {},
      state: {},
    });
  });

  markComplete(todo: Todo) {
    this.todoService.markComplete(todo);
  }
}
