import { Component } from '@angular/core';
import {LogoComponent} from '../components/logo/logo.component';
import {DatabaseTableComponent} from '../components/database-table/database-table.component';

@Component({
  selector: 'app-database-view',
  imports: [
    LogoComponent,
    DatabaseTableComponent
  ],
  templateUrl: './database-view.component.html',
  standalone: true,
  styleUrl: './database-view.component.css'
})
export class DatabaseViewComponent {

}
