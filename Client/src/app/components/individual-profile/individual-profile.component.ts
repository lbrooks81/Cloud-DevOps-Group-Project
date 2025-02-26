import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-individual-profile',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './individual-profile.component.html',
  standalone: true,
  styleUrl: './individual-profile.component.css'
})
export class IndividualProfileComponent {
  testData =
    {
      firstName: 'Valtor',
      lastName: 'TheGreat',
      role: 'Software Developer',
      department: 'IT',
      email: 'valtorthgreat@it.com',
      phone: '123-456-7890',
      username: 'ValtorTheGreat'
    };
}
