import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-record-form',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './record-form.component.html',
  standalone: true,
  styleUrl: './record-form.component.css'
})
export class RecordFormComponent {
    errorMessage: any;

}
