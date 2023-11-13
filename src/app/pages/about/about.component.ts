import { DataTableComponent } from '@/app/components/data-table/data-table.component';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ColumnDef } from '@tanstack/table-core';
import { ContactService, User } from '../contact/contact.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, DataTableComponent],
  template: `
    <a routerLink="/">Home</a>
    <a routerLink="/about">About Us</a>
    <a routerLink="/contact">Contact</a>
    <div class="prose mx-auto min-w-fit">
      @if (users() !== undefined) {
      <app-data-table
        [data]="users()!"
        [columnDefs]="columnDefs()"
        caption="All Users"
      />
      }
    </div>
  `,
  styles: ``,
})
export class AboutComponent {
  userService = inject(ContactService);

  users = this.userService.users;

  columnDefs = signal<ColumnDef<User>[]>([
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
  ]);
}
