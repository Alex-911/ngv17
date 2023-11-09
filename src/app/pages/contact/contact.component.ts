import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a routerLink="/">Home</a>
    <a routerLink="/about">About Us</a>
    <a routerLink="/contact">Contact</a>
    <p>contact works!</p>
  `,
  styles: ``,
})
export class ContactComponent {}
