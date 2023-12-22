import { GridService } from '@/app/shared/ui/data-grid/grid.service';
import { CommonModule } from '@angular/common';
import { Component, Input, computed, inject, signal } from '@angular/core';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/table-core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="w-96 h-96">
      <caption>
        {{
          tableCaption
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
      <tbody class="h-96 overflow-y-scroll">
        @for (row of table().getPaginationRowModel().rows; track $index) {
        <tr>
          @for (cell of row.getAllCells(); track $index) {
          <td>{{ cell.getValue() }}</td>
          }
        </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
})
export class DataTableComponent {
  @Input({ required: true }) data!: any[];
  @Input({ required: true }) columnDefs!: ColumnDef<any>[];
  @Input() tableCaption: string = '';

  private gridService = inject(GridService);

  table = computed(() =>
    this.gridService.createTable({
      columns: this.columnDefs,
      data: this.data,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 2,
        },
      },
    })
  );

  goToFirstPage() {
    this.table().setPageIndex(0);
  }

  goPrevPage() {
    this.table().previousPage();
  }

  canPreviousPage = computed(() => this.table().getCanPreviousPage());

  goToLastPage() {
    this.table().setPageIndex(this.table().getPageCount() - 1);
  }

  goNextPage() {
    this.table().nextPage();
  }
  canNextPage = computed(() => this.table().getCanNextPage());
}
