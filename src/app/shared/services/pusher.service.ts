import {
  Injectable,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import pusherJs, { Channel } from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class PusherService implements OnDestroy, OnInit {
  private pusher = new pusherJs('9dcc26fe3fa1766acc88', {
    cluster: 'ap2',
  });
  channel = signal<Channel>(this.pusher.subscribe('hello'));

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub() {
    this.pusher.unbind_all();
    this.pusher.unsubscribe('hello');
  }
}
