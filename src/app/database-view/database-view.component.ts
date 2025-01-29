import { Component } from '@angular/core';
import {LogoComponent} from '../components/logo/logo.component';

@Component({
  selector: 'app-database-view',
  imports: [
    LogoComponent
  ],
  templateUrl: './database-view.component.html',
  standalone: true,
  styleUrl: './database-view.component.css'
})
export class DatabaseViewComponent {

}
