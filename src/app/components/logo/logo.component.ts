import { Component } from '@angular/core';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';

@Component({
  selector: 'app-logo',
  imports: [
    CircuitAnimationComponent
  ],
  templateUrl: './logo.component.html',
  standalone: true,
  styleUrl: './logo.component.css'
})
export class LogoComponent {

}
