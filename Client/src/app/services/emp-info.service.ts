import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmpInfoModel} from '../models/emp-info.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpInfoService {
  private apiUrl = 'http://technickalindustries2-ece8cjfmbth5fpfj.canadacentral-01.azurewebsites.net/emp-info';
  constructor(private http: HttpClient) { }

  getEmployeeInfo(username: string, password: string): Observable<EmpInfoModel[]> {
    const escapedUsername = encodeURIComponent(username);
    const escapedPassword = encodeURIComponent(password);
    console.log("USERNAME", escapedUsername);
    console.log("PASSWORD", escapedPassword);
    return this.http.put<EmpInfoModel[]>(this.apiUrl, {"thisUsername": escapedUsername, "thisPassword": escapedPassword});
  }
}
