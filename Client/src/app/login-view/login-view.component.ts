import { Component } from '@angular/core';
import {CircuitAnimationComponent} from '../components/circuit-animation/circuit-animation.component';
import {LoginFormComponent} from '../components/login-form/login-form.component';

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
}
