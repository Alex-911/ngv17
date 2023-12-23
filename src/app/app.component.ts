import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, RouterLink],
  template: `
    <div
      class="h-[100dvh] flex flex-col items-stretch justify-start bg-gradient-to-br from-pink-600 to-fuchsia-600"
    >
      <div
        class="flex items-center justify-start gap-5 bg-transparent absolute"
      >
        <a
          class="hover:text-white hover:from-pink-600 hover:bg-gradient-to-tr hover:to-fuchsia-600 p-2 hover:rounded-lg hover:shadow-lg"
          routerLink="/"
        >
          Home
        </a>
        <a
          class="hover:text-white hover:from-pink-600 hover:bg-gradient-to-tr hover:to-fuchsia-600 p-2 hover:rounded-lg hover:shadow-lg"
          routerLink="/about"
        >
          About Us
        </a>
        <a
          class="hover:text-white hover:from-pink-600 hover:bg-gradient-to-tr hover:to-fuchsia-600 p-2 hover:rounded-lg hover:shadow-lg"
          routerLink="/todos"
        >
          Todos
        </a>
        <a
          class="hover:text-white hover:from-pink-600 hover:bg-gradient-to-tr hover:to-fuchsia-600 p-2 hover:rounded-lg hover:shadow-lg"
          routerLink="/contact"
        >
          Contact
        </a>
      </div>
      <div class="flex-grow pt-16 h-full overflow-y-auto m-2 md:m-auto">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {}
