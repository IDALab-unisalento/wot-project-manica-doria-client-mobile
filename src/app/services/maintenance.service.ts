import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Maintenance } from '../models/maintenance';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const getAllMaintenceByUser = 'http://localhost:8080/api/maintenance/getMaintenaceFromUser/';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  getAllMaintenaceByUser(): Observable<Maintenance[]> {

    return this.http.get<Maintenance[]>(getAllMaintenceByUser + '1');
  }

}
