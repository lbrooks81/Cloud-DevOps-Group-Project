import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeModel} from '../models/employee.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/employees';
  constructor(private http: HttpClient) { }
  getEmployees(id: number): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`http://localhost:8080/myplantemployees/${id}`)
  }
  getOneEmployee(id: number): Observable<EmployeeModel>
  {
    return this.http.get<EmployeeModel>(`${this.apiUrl}/${id}`);
  }

}

