import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':shortCode',
    loadComponent: () =>
      import('./redirect/redirect.component').then((m) => m.RedirectComponent),
  },
];
