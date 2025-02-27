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

  getEmployeeInfo(username: string): Observable<EmpInfoModel[]> {
    return this.http.get<EmpInfoModel[]>(`${this.apiUrl}?username=${username}`);
  }

}
