import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PartModel} from '../models/part.model';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private apiUrl = 'https://localhost:3000/parts';
  constructor(private http: HttpClient) { }

  getParts(): Observable<PartModel[]> {
    return this.http.get<PartModel[]>(`${this.apiUrl}`);
  }
}
