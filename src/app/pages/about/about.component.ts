import { PusherService } from '@/app/shared/services/pusher.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a routerLink="/">Home</a>
    <a routerLink="/about">About Us</a>
    <a routerLink="/contact">Contact</a>
    <div class="prose mx-auto min-w-fit">
      <h1>Websocket Messages</h1>
      @for (m of msg(); track $index) {
      <pre>{{ m | json }}</pre>
      }
    </div>
  `,
  styles: ``,
})
export class AboutComponent implements OnInit, OnDestroy {
  pusher = inject(PusherService);
  channel = this.pusher.channel;
  msg = signal<Record<string, unknown>[]>([]);

  ngOnInit(): void {
    this.pusher.channel().bind('new-message', this.newMessage);
  }
  ngOnDestroy(): void {
    this.channel().unbind('new-message', this.newMessage);
  }

  newMessage = (data: Record<string, unknown>) => {
    this.msg.update((d) => [...d, data]);
  };
}
