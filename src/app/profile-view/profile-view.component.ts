import { Component } from '@angular/core';
import {HeaderComponent} from '../components/header/header.component';

@Component({
  selector: 'app-profile-view',
  imports: [
    HeaderComponent
  ],
  templateUrl: './profile-view.component.html',
  standalone: true,
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {

}
