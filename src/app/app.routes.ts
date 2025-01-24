import { Routes } from '@angular/router';
import { RegisterViewComponent } from './register-view/register-view.component';

export const routes: Routes = [
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path: 'register', component: RegisterViewComponent}
];
