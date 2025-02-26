import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CompanyModel} from '../models/company.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private apiUrl = 'https://localhost:3000/companies';
  constructor(private http: HttpClient) { }
  getCompanies(): Observable<CompanyModel[]> {
    return this.http.get<CompanyModel[]>(this.apiUrl);
  }
}
