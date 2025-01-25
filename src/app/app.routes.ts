import { Routes } from '@angular/router';
import { RegisterViewComponent } from './register-view/register-view.component';
import {DatabaseViewComponent} from './database-view/database-view.component';
import {ProfileViewComponent} from './profile-view/profile-view.component';
import {IndividualRecordViewComponent} from './individual-record-view/individual-record-view.component';
import {LoginViewComponent} from './login-view/login-view.component';

export const routes: Routes = [
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path: 'login', component: LoginViewComponent},
  {path: 'register', component: RegisterViewComponent},
  {path: 'database', component: DatabaseViewComponent},
  {path: 'profile', component: ProfileViewComponent},
  {path: 'record', component: IndividualRecordViewComponent}
];
// TODO - Protect these routes via rerouting to /login if the user is not logged in. 
