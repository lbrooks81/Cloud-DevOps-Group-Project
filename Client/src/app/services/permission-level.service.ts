import { Injectable } from '@angular/core';
import {PermissionLevelModel} from '../models/permission-level.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionLevelService {
  private apiUrl = 'http://technickalindustries2-ece8cjfmbth5fpfj.canadacentral-01.azurewebsites.net/my-permission-level';
  private apiUrlHigher = 'http://technickalindustries2-ece8cjfmbth5fpfj.canadacentral-01.azurewebsites.net/permission-levels';

  constructor(private http: HttpClient) { }

  getPermissionLevels(id: number): Observable<PermissionLevelModel[]> {
    return this.http.get<PermissionLevelModel[]>(`${this.apiUrl}/${id}`);
  }

  getPermissionLevelHigher(): Observable<PermissionLevelModel[]> {
    return this.http.get<PermissionLevelModel[]>(this.apiUrlHigher);
  }
}
