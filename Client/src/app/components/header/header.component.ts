import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {LogoComponent} from '../logo/logo.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    LogoComponent,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
}
