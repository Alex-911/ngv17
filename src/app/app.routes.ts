import { HomeComponent } from '@/app/pages/home/home.component';
import { Routes } from '@angular/router';
import { AboutComponent } from '@/app/pages/about/about.component';
import { ContactComponent } from '@/app/pages/contact/contact.component';
import { TodosComponent } from './pages/todos/todos.component';
import { authenticatedGuard } from './shared/guards/auth/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => HomeComponent,
    title: 'New Angular',
  },
  {
    path: 'about',
    loadComponent: () => AboutComponent,
    title: 'About',
  },
  {
    path: 'contact',
    loadComponent: () => ContactComponent,
    title: 'Contacts',
  },
  {
    path: 'todos',
    loadComponent: () => TodosComponent,
    title: 'Todos',
    canActivate: [authenticatedGuard],
  },
];
