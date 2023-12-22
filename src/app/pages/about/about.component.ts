import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
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
    </div>
  `,
  styles: ``,
})
export class AboutComponent {}
