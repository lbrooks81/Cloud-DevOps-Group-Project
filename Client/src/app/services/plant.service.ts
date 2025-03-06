import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlantModel} from '../models/plant.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = 'http://localhost:8080/myplant';

  constructor(private http: HttpClient) { }
  getPlants(id: number): Observable<PlantModel[]> {
    return this.http.get<PlantModel[]>(`${this.apiUrl}/${id}`);
  }
}
