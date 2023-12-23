import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prose mx-auto min-w-fit">
      <h1>Websocket Messages</h1>
    </div>
  `,
  styles: ``,
})
export class AboutComponent {}
