import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CircuitAnimationComponent} from './components/circuit-animation/circuit-animation.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage, CircuitAnimationComponent, RegisterFormComponent, RouterOutlet, HeaderComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CircuitComponent';
}
