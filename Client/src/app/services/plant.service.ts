import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlantModel} from '../models/plant.model';
import {Observable} from 'rxjs';

// TODO - Make the port a global so it can be easily changed.

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = 'https://localhost:3000/plants';

  constructor(private http: HttpClient) { }
  getPlants(): Observable<PlantModel[]> {
    return this.http.get<PlantModel[]>(this.apiUrl);
  }
}
