import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
      path: 'login',
      loadComponent: () =>
        import('./pages/login/login.component').then(m => m.LoginComponent)
    }
  ];
  