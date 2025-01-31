import { Component } from '@angular/core';
import {DatabaseTableComponent} from '../components/database-table/database-table.component';
import {HeaderComponent} from '../components/header/header.component';

@Component({
  selector: 'app-database-view',
  imports: [
    DatabaseTableComponent,
    HeaderComponent
  ],
  templateUrl: './database-view.component.html',
  standalone: true,
  styleUrl: './database-view.component.css'
})
export class DatabaseViewComponent {

}
