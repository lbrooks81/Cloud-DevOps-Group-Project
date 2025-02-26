import { Injectable } from '@angular/core';
import {PermissionLevelModel} from '../models/permission-level.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionLevelService {
  private apiUrl = 'https://localhost:3000/permission-levels';

  constructor(private http: HttpClient) { }
  getPermissionLevels(): Observable<PermissionLevelModel[]> {
    return this.http.get<PermissionLevelModel[]>(this.apiUrl);
  }
}
