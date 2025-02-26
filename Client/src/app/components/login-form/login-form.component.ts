import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {getCookie} from '../../cookieShtuff';
import {FormsModule} from '@angular/forms';
import {Octokit} from 'octokit';

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

  setEmployeeInformation(){
/*
    this.getUserInformation(this.username);
*/
    // TODO verify login
    // TODO set user ID cookie
    // TODO navigate to database page.


/*
    getCookie('employee-info', '')
*/
  }

  async getUserInformation() {
    /*let data = ((await this.octokit.request(`GET http://localhost:3000/emp-info?username=${encodeURIComponent(this.username)}`, {}))).data;
    let employee: {} = [...data]
    console.log(employee)*/
  } // TODO this returns errors
}
