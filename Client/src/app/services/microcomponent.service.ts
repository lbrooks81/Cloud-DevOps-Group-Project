import { Injectable } from '@angular/core';
import {MicrocomponentModel} from '../models/microcomponent.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MicrocomponentService {
  private apiUrl = 'https://localhost:3000/micro-components';
  constructor(private http: HttpClient) { }
  getMicrocomponents(): Observable<MicrocomponentModel[]> {
    return this.http.get<MicrocomponentModel[]>(this.apiUrl);
  }
}
