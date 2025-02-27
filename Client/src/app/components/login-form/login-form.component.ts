import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {getCookie} from '../../cookieShtuff';
import {FormsModule} from '@angular/forms';
import {Octokit} from 'octokit';
import {EmpInfoService} from '../../services/emp-info.service';
import {EmpInfoModel} from '../../models/emp-info.model';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule
  ],
  templateUrl: './login-form.component.html',
  standalone: true,
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  private octokit = new Octokit({});
  public username: string = "";
  public userEmail: string = "";
  public userID: string = "";
  public password: string = "";
  public empInfo: EmpInfoModel[] = [];

  constructor(private empInfoService: EmpInfoService) { }

  setEmployeeInformation(){

    this.getUserInformation();

    // TODO verify login
    // TODO set user ID cookie
    // TODO navigate to database page.


/*
    getCookie('employee-info', '')
*/
  }

  async getUserInformation() {
    this.empInfoService.getEmployeeInfo(this.username).subscribe({
      next: (data) => {
        this.empInfo = [...data];
        console.log("Emp Info: ", this.empInfo);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
