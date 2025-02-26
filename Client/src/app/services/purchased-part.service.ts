import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PurchasedPartModel} from '../models/purchased-part.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasedPartService {
  private apiUrl = 'https://localhost:3000/purchased-parts';

  constructor(private http: HttpClient) { }
  getPurchasedParts(): Observable<PurchasedPartModel[]>{
    return this.http.get<PurchasedPartModel[]>(this.apiUrl);
  }
}
