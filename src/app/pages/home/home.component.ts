import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { parse } from 'marked';
import { catchError, of } from 'rxjs';
import { environment } from '@/environments/environment';
import { RouterLink, RouterOutlet } from '@angular/router';

export type Res = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Geo = {
  lat: string;
  lng: string;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="prose mx-auto container min-w-fit h-full overflow-y-auto">
      <h1>{{ title }}</h1>

      @if (loading()) {
      <p>Loading</p>
      } @else { @if (data()) {
      <pre lang="ts">{{ data() | json }}</pre>
      } @else{
      <p>No Data available</p>
      } }
      <!-- Blog -->
      @if (blog() !== null) {
      <div [innerHTML]="blog()"></div>
      } @else {
      <p>Loading..</p>
      }
    </div>
  `,
  styles: ``,
})
export class HomeComponent {
  title = 'New Angular v17';
  loading = signal<boolean>(false);
  data = signal<Res | null>(null);
  http = inject(HttpClient);

  counter = signal(0);

  blog = signal<string | null>(null);

  constructor() {
    this.getData();
  }

  getData() {
    this.loading.set(true);
    this.http
      .get<Res>(environment.apiUrl)
      .pipe(
        catchError((e) => {
          return of(null);
        })
      )
      .subscribe((d) => {
        this.loading.set(false);
        if (d !== null) {
          this.data.set(d);
          const data = parse(
            '# Angular Blog v17 \n---\n## Highlights \nIn this new version, angular has evolved dramitically.\n`export const func = await fetch();` also many things has changed.\n\n ```constructor() { \nthis.getData();\n}```',
            {
              gfm: true,
              pedantic: true,
            }
          );
          this.blog.set(data);
        }
      });
  }

  increment() {
    this.counter.update((c) => c + 1);
  }
  decrement() {
    this.counter.update((c) => c - 1);
  }
}
