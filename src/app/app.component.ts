import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CircuitAnimationComponent} from './circuit-animation/circuit-animation.component';
import {RegisterFormComponent} from './register-form/register-form.component';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage, CircuitAnimationComponent, RegisterFormComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CircuitComponent';
}
