import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PurchasedPartModel} from '../models/purchased-part.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasedPartService {
  private apiUrl = 'http://technickalindustries2-ece8cjfmbth5fpfj.canadacentral-01.azurewebsites.net/our-purchased-parts';

  constructor(private http: HttpClient) { }
  getPurchasedParts(id: number): Observable<PurchasedPartModel[]>{
    return this.http.get<PurchasedPartModel[]>(`${this.apiUrl}/${id}`);
  }
}
