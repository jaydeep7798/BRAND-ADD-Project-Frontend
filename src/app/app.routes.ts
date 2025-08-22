import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./Modules/loginModule/login/login.module').then(m => m.LoginModule)
    // ...existing code.../login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

