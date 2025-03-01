import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {EmployeeService} from '../../services/employee.service';
import {EmployeeModel} from '../../models/employee.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-individual-profile',
  imports: [
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './individual-profile.component.html',
  standalone: true,
  styleUrl: './individual-profile.component.css'
})
export class IndividualProfileComponent  {

  employeeData$!: Observable<EmployeeModel>;

  constructor(private employeeService: EmployeeService)
    {

    }

    ngOnInit(): void {
        this.employeeData$ = this.employeeService.getOneEmployee(100);
    }

}
