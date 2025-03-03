import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {getCookie, setCookie} from '../../cookieShtuff';
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
export class LoginFormComponent implements OnInit{
  public username: string = "";
  public userID: string = "";
  public password: string = "";
  public empInfo: EmpInfoModel[] = [];

  constructor(private empInfoService: EmpInfoService, private router: Router) { }

  ngOnInit() {
    if(getCookie('employee-id'))
    {
      this.router.navigate(['/database']);
    }
  }

  async setEmployeeInformation() {

    await this.getUserInformation();
  }

  async getUserInformation() {


    this.empInfoService.getEmployeeInfo(this.username, this.password).subscribe({
      next: (data) => {
        this.empInfo = data;
        console.log(this.empInfo);
        // @ts-ignore
        if(this.empInfo["validLogin"])
        {
          // @ts-ignore
          this.userID = this.empInfo["empId"] as string;
          console.log("Emp Info: ", this.userID);
          setCookie('employee-id', this.userID.toString());
          this.router.navigate(['/database']);
        }
        else {
          // @ts-ignore

          this.username = "";
          this.password = "";
          alert("Invalid Login");
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
