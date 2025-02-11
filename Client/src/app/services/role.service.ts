import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RoleModel} from '../models/role.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:3000/roles';

  constructor(private http: HttpClient) { }
  getRoles(): Observable<RoleModel[]>{
    return this.http.get<RoleModel[]>(this.apiUrl);
  }
}
