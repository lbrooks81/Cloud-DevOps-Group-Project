import { Component } from '@angular/core';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {RegisterFormComponent} from '../register-form/register-form.component';

@Component({
  selector: 'app-register-view',
  imports: [
    CircuitAnimationComponent,
    RegisterFormComponent
  ],
  templateUrl: './register-view.component.html',
  standalone: true,
  styleUrl: './register-view.component.css'
})
export class RegisterViewComponent {

}
