import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private apiUrl = 'http://localhost:3000/parts';
  constructor(private http: HttpClient) { }

  /*getParts(): Observable<Parts[]>{

  }*/
}
