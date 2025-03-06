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
  getPartById(id: number): Observable<PartModel> {
    return this.http.get<PartModel>(`${this.apiUrl}/${id}`);
  }

  createPart(part: PartModel): Observable<PartModel> {
    return this.http.post<PartModel>(`${this.apiUrl}`, part);
  }

  updatePart(id: number, part: PartModel): Observable<PartModel> {
    return this.http.put<PartModel>(`${this.apiUrl}/${id}`, part);
  }

  deletePart(id: number): Observable<PartModel>{
    return this.http.delete<PartModel>(`${this.apiUrl}/${id}`);
  }
}
/*
Observable is a special list
A representation of any set of values over any amount of time
From rxjs library
Easier to work with than arrays
*/
