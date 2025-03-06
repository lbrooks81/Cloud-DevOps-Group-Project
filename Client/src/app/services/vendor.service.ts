import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VendorModel} from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'http://technickalindustries2-ece8cjfmbth5fpfj.canadacentral-01.azurewebsites.net/our-vendors';

  constructor(private http: HttpClient) { }
  getVendors(id: number): Observable<VendorModel[]>{
    return this.http.get<VendorModel[]>(`${this.apiUrl}/${id}`);
  }
}
