import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CircuitAnimationComponent} from './components/circuit-animation/circuit-animation.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage, CircuitAnimationComponent, RegisterFormComponent, RouterOutlet
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CircuitComponent';
}
