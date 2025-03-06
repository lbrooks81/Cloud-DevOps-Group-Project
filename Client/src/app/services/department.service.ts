import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DepartmentModel} from '../models/department.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://technickalindustries2-ece8cjfmbth5fpfj.canadacentral-01.azurewebsites.net/our-departments';

  constructor(private http: HttpClient) { }
  getDepartments(id: number): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${this.apiUrl}/${id}`);
  }
}
