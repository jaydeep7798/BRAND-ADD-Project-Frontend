import { Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { authGuard } from './Guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./Modules/loginModule/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    component: DashboardComponent, canActivate:[authGuard]
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

