import {Component, OnInit} from '@angular/core';
import { NgOptimizedImage} from '@angular/common';
import {EmployeeService} from '../../services/employee.service';
import {EmployeeModel} from '../../models/employee.model';

@Component({
  selector: 'app-individual-profile',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './individual-profile.component.html',
  standalone: true,
  styleUrl: './individual-profile.component.css'
})
export class IndividualProfileComponent implements OnInit {

  public employees: EmployeeModel | undefined;
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService)
    {

    }

    ngOnInit(): void {
      this.getOneEmployees(100);
    }

  getOneEmployees(id: number) {
    this.employeeService.getOneEmployee(id).subscribe({
      next: (data) => {
        this.employees = data;
        console.log("Employees", this.employees);
      },
      error:(error) => {
        this.errorMessage = 'Error fetching employees';
        console.error(`${this.errorMessage}`, error);
      }
    })
  }

}
