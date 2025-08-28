import { Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./Modules/loginModule/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',  // wildcard for unknown routes
    redirectTo: 'login'
  }
];

