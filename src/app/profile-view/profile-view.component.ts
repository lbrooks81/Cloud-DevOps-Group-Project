import { Component } from '@angular/core';
import {LogoComponent} from '../components/logo/logo.component';

@Component({
  selector: 'app-profile-view',
  imports: [
    LogoComponent
  ],
  templateUrl: './profile-view.component.html',
  standalone: true,
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {

}
