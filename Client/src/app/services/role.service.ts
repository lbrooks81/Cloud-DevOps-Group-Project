import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RoleModel} from '../models/role.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://technickalindustries2-ece8cjfmbth5fpfj.canadacentral-01.azurewebsites.net/';

  constructor(private http: HttpClient) {}

  getRoles(id: number): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${this.apiUrl}my-role/${id}`);
  }

  getRolesHigher(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${this.apiUrl}roles`);
  }
}
