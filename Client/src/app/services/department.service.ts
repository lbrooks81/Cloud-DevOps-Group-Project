import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DepartmentModel} from '../models/department.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8080/our-departments';

  constructor(private http: HttpClient) { }
  getDepartments(id: number): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${this.apiUrl}/${id}`);
  }
}
