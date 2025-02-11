import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderModel} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';
  constructor(private http: HttpClient) { }
  getOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.apiUrl);
  }
}
