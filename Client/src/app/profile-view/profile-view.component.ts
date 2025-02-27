import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
import {IndividualProfileComponent} from '../components/individual-profile/individual-profile.component';
import {getCookie} from '../cookieShtuff';
import {Router} from '@angular/router';


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
export class ProfileViewComponent implements OnInit{
  constructor (private router: Router) {}

  ngOnInit() {
    if(!getCookie('employee-id'))
    {
      this.router.navigate(['/']);
    }

    document.querySelector('.navbar-block')!.classList.add('d-none');

  }
}
