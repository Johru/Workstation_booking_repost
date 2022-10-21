import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from '../help-files/building-interface';
import { Success } from './success';

@Injectable({
  providedIn: 'root',
})
export class BuildingNewService {
  constructor(private http: HttpClient) {}

  addBuilding(newBuilding: Building): Observable<Success> {
    return this.http.post<Success>(
      `http://localhost:8080/api/building/new`,
      newBuilding
    );
  }

  getBuilding(id: number): Observable<Building> {
    return this.http.get<Building>(`http://localhost:8080/api/building/${id}`);
  }

  editBuilding(id: number, updatedValues: Building): Observable<Success> {
    return this.http.put<Success>(
      `http://localhost:8080/api/building/${id}/edit`,
      updatedValues
    );
  }
}
