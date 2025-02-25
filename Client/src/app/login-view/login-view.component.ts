import { Component } from '@angular/core';
import {CircuitAnimationComponent} from '../components/circuit-animation/circuit-animation.component';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {EmployeeService} from '../services/employee.service';
import { EmployeeModel } from '../models/employee.model';
import {Octokit} from 'octokit';

@Component({
  selector: 'app-login-view',
  imports: [
    CircuitAnimationComponent,
        LoginFormComponent,
  ],
  templateUrl: './login-view.component.html',
  standalone: true,
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {


  ngOnInit() {
    


  }

}
