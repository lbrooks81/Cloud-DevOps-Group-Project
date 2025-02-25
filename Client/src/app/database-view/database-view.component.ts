import { Component } from '@angular/core';
import {DatabaseTableComponent} from '../components/database-table/database-table.component';
import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';

@Component({
  selector: 'app-database-view',
  imports: [
    DatabaseTableComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './database-view.component.html',
  standalone: true,
  styleUrl: './database-view.component.css'
})
export class DatabaseViewComponent {
/*  employees: EmployeeModel[] = [];
  errorMessage: string = "";*/

/*
  constructor(private empService: EmployeeService) {}
*/

  ngOnInit() {
    document.querySelector('.home-button')!.classList.add('d-none');
    /*this.empService.getEmployees().subscribe({
      next: (data) => {
        this.employees = [...data];
        console.log(this.employees);

      },
      error: (err) => {
        this.errorMessage = 'Error fetching employees.';
        console.error(`${this.errorMessage}`, err);
      }
    });*/
  }
}
