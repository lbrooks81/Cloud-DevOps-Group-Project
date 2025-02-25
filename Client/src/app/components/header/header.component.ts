import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {LogoComponent} from '../logo/logo.component';
import {MatRipple} from '@angular/material/core';
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
  myColor: string = "white";
}
