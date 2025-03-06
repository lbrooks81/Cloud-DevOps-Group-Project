import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MicroComponentModel} from '../models/micro-component.model';

@Injectable({
  providedIn: 'root'
})
export class MicroComponentService {
  private apiUrl = 'https://localhost:3000/my-micro-components';
  constructor(private http: HttpClient) { }

  getMicroComponents(id: number = 100): Observable<MicroComponentModel[]> {
    return this.http.get<MicroComponentModel[]>(`${this.apiUrl}/${id}`);
  }
}
