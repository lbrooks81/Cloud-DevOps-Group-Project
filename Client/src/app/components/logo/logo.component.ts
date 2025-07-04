import { Component } from '@angular/core';
import {CircuitForLogoComponent} from '../circuit-for-logo/circuit-for-logo.component';

@Component({
  selector: 'app-logo',
  imports: [
    CircuitForLogoComponent
  ],
  templateUrl: './logo.component.html',
  standalone: true,
  styleUrl: './logo.component.css'
})
export class LogoComponent {
}
