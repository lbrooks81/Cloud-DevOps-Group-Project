import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmpInfoModel} from '../models/emp-info.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpInfoService {
  private apiUrl = 'https://localhost:3000/emp-info';
  constructor(private http: HttpClient) { }

  getEmployeeInfo(username: string, password: string): Observable<EmpInfoModel[]> {
    const escapedUsername = encodeURIComponent(username);
    const escapedPassword = encodeURIComponent(password);
    return this.http.put<EmpInfoModel[]>(this.apiUrl, [escapedUsername, escapedPassword]);
  }
}
