import { GridService } from '@/app/shared/ui/data-grid/grid.service';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  PaginationState,
  Table,
  TableState,
  Updater,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/table-core';
import { ContactService, User } from './contact.service';
import { Todo, TodoService } from './todo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-start justify-start gap-2 flex-grow">
      @if (users()) {
      <div class="flex items-stretch justify-start flex-col gap-5 w-64 p-2">
        @for (user of users(); track $index) {
        <div
          class="p-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white cursor-pointer"
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
        <div>
          <table class="">
            <caption>
              {{
                tableCaption()
              }}
            </caption>
            <thead>
              @for (headerGroup of table().getHeaderGroups(); track $index) {
              <tr>
                @for (head of headerGroup.headers; track $index) {
                <th class="min-w-max">{{ head.column.columnDef.header }}</th>
                }
              </tr>
              }
            </thead>
            @if (loading()) {
            <tbody>
              <tr>
                <td>Loading....</td>
                <td></td>
              </tr>
            </tbody>
            } @else {
            <tbody>
              @for (row of table().getRowModel().rows; track $index) {
              <tr>
                @for (cell of row.getVisibleCells(); track $index) {
                <td>{{ cell.getValue() }}</td>
                }
              </tr>
              }
            </tbody>
            }
          </table>
          <div class="flex items-center justify-end gap-5">
            <button
              type="button"
              (click)="goToFirstPage()"
              [disabled]="!canPreviousPage()"
            >
              {{ 'First' }}
            </button>
            <button
              type="button"
              (click)="goPrevPage()"
              [disabled]="!canPreviousPage()"
            >
              {{ 'Prev' }}
            </button>
            <p>
              {{ pageStatus().currentPage + 1 }} of
              {{ pageStatus().totalPage }}
            </p>
            <button
              type="button"
              (click)="goNextPage()"
              [disabled]="!canNextPage()"
            >
              {{ 'Next' }}
            </button>
            <button
              type="button"
              (click)="goToLastPage()"
              [disabled]="!canNextPage()"
            >
              {{ 'Last' }}
            </button>

            <select class="cursor-pointer" (change)="setPageSize($event)">
              @for (size of ["2","5","10","20"]; track $index) {
              <option [value]="size">
                {{ size }}
              </option>
              }
            </select>
          </div>
        </div>
        } } @else {
        <p>Please Select a user.</p>
        }
      </div>
      } @loading(after 100ms; minimum 1s) {
      <p>Loading</p>
      }
    </div>
  `,
  styles: ``,
})
export class ContactComponent {
  private contactService = inject(ContactService);
  private todoService = inject(TodoService);
  private gridService = inject(GridService);
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

  paginationState = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });

  table = computed<Table<Todo>>(() => {
    return this.gridService.createTable<Todo>({
      columns: [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'title', header: 'Title' },
        { accessorKey: 'completed', header: 'Completed' },
        { accessorKey: 'userId', header: 'User Id' },
      ],
      data: this.userTodos(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onStateChange: function (updater: Updater<TableState>): void {},
      state: {
        pagination: this.paginationState(),
      },
    });
  });

  markComplete(todo: Todo) {
    this.todoService.markComplete(todo);
  }

  // paginationUpdate(): OnChangeFn<PaginationState> {
  //   return () =>
  //     ({
  //       pageIndex: this.table().setPageIndex(),
  //       pageSize: updater.pageSize,
  //     } as PaginationState);
  // }

  goToFirstPage() {
    // this.table().setPageIndex(0);
    this.paginationState.set({ pageIndex: 0, pageSize: 2 });
  }
  goPrevPage() {
    // this.table().previousPage();
    const state = this.table().getState().pagination;
    this.paginationState.set({
      pageIndex: state.pageIndex - 1,
      pageSize: state.pageSize,
    });
  }

  pageStatus = computed(() => {
    const totalPage = this.table().getPageCount();
    const currentPage = this.paginationState().pageIndex;
    return { totalPage, currentPage };
  });

  canPreviousPage = computed(() => this.table().getCanPreviousPage());

  goToLastPage() {
    // this.table().setPageIndex(this.table().getPageCount() - 1);
    const state = this.table().getState().pagination;
    this.paginationState.set({
      pageIndex: this.table().getPageCount() - 1,
      pageSize: state.pageSize,
    });
  }
  goNextPage() {
    // this.table().nextPage();
    const state = this.table().getState().pagination;
    this.paginationState.set({
      pageIndex: state.pageIndex + 1,
      pageSize: state.pageSize,
    });
  }
  canNextPage = computed(() => this.table().getCanNextPage());

  rerender() {
    const d = this.userTodos();
    this.userTodos.set(d);
  }

  setPageSize(event: Event) {
    const size = (event.target as HTMLSelectElement).value;
    this.paginationState.update((prev) => ({
      ...prev,
      pageSize: Number.parseInt(size),
    }));
  }
}
