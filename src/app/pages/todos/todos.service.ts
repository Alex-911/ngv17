import { Injectable, PLATFORM_ID, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  http = inject(HttpClient);
  router = inject(Router);
  constructor() {
    effect(
      () => {
        if (isPlatformBrowser(PLATFORM_ID)) {
          console.log('BROWSER', PLATFORM_ID);
          this.router.navigateByUrl('/');
        }
      },
      { allowSignalWrites: true }
    );
  }
  getTodos() {
    return this.http
      .get('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .pipe(catchError((_) => []));
  }
}
