import { Component } from '@angular/core';
import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
import {IndividualProfileComponent} from '../components/individual-profile/individual-profile.component';

@Component({
  selector: 'app-profile-view',
  imports: [
    HeaderComponent,
    FooterComponent,
    IndividualProfileComponent
  ],
  templateUrl: './profile-view.component.html',
  standalone: true,
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {

}
