import { Injectable } from '@angular/core';
import {
  RowData,
  TableOptions,
  TableOptionsResolved,
  TableState,
  Updater,
  createTable,
} from '@tanstack/table-core';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  createTable<TData extends RowData>(options: TableOptions<TData>) {
    const resolvedOptions: TableOptionsResolved<TData> = {
      state: {},
      onStateChange: () => {},
      renderFallbackValue: null,
      ...options,
    };

    const table = createTable(resolvedOptions);

    const state = table.initialState;

    table.setOptions((previous) => {
      const nextState = {
        ...previous,
        ...options,
        state: {
          ...state,
          ...options.state,
        },
        onStateChange: (updater: Updater<TableState>) => {
          options.onStateChange && options.onStateChange(updater);
        },
      };

      return nextState;
    });

    return table;
  }
}
