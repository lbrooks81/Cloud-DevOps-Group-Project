import { Component } from '@angular/core';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {CircuitForLogoComponent} from '../circuit-for-logo/circuit-for-logo.component';

@Component({
  selector: 'app-logo',
  imports: [
    CircuitAnimationComponent,
    CircuitForLogoComponent
  ],
  templateUrl: './logo.component.html',
  standalone: true,
  styleUrl: './logo.component.css'
})
export class LogoComponent {

}
