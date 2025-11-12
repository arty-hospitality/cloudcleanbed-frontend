import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component.ts';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];
