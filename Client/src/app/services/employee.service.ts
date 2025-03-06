import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeModel} from '../models/employee.model';
import {Observable} from 'rxjs';
import {ProfileModel} from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:3000';
  constructor(private http: HttpClient) { }
  getEmployees(id: number): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${this.apiUrl}/myplantemployees/${id}`)
  }
  getOneEmployee(id: number): Observable<EmployeeModel>
  {
    return this.http.get<EmployeeModel>(`${this.apiUrl}/employees/${id}`);
  }

  getProfileInfo(id: number): Observable<ProfileModel>{
    return this.http.get<ProfileModel>(`${this.apiUrl}/profile/${id}`)
  }
}

