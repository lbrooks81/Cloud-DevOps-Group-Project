import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {EmployeeService} from '../../services/employee.service';
import {ProfileModel} from '../../models/profile.model';
import {Router} from '@angular/router';
import {ProfileModel} from '../../models/profile.model';

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

  public employees: ProfileModel | undefined;
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getOneEmployees(100);
  }

  getOneEmployees(id: number) {
    this.employeeService.getProfileInfo(id).subscribe({
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

  logYourselfOut(){
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
    this.router.navigate(['/login']);
  }

}
