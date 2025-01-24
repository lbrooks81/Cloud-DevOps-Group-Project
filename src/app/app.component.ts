import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CircuitAnimationComponent} from './circuit-animation/circuit-animation.component';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage, CircuitAnimationComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CircuitComponent';
}
