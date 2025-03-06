import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RoleModel} from '../models/role.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getRoles(id: number): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${this.apiUrl}my-role/${id}`);
  }

  getRolesHigher(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${this.apiUrl}roles`);
  }
}
