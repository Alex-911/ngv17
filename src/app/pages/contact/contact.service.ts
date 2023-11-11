import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  http = inject(HttpClient);

  selectedUser = signal<User | undefined>(undefined);

  private users$ = this.http
    .get<User[]>(`https://jsonplaceholder.typicode.com/users`)
    .pipe(catchError(() => of([])));

  users = toSignal<User[]>(this.users$);

  selectUser(user: User) {
    this.selectedUser.set(user);
  }
}
