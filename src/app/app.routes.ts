import { HomeComponent } from '@/app/pages/home/home.component';
import { Routes } from '@angular/router';
import { AboutComponent } from '@/app/pages/about/about.component';
import { ContactComponent } from '@/app/pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => HomeComponent,
  },
  {
    path: 'about',
    loadComponent: () => AboutComponent,
  },
  {
    path: 'contact',
    loadComponent: () => ContactComponent,
  },
];
