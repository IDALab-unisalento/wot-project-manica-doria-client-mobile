import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Maintenance } from '../models/maintenance';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const getAllMaintenanceByUser = 'http://localhost:8080/api/maintenance/getMaintenaceFromUser/';
const getAllMaintenance = 'http://localhost:8080/api/maintenance/getAll';
const getMaintenanceById = 'http://localhost:8080/api/maintenance/getById/';
const saveMaintenance = 'http://localhost:8080/api/maintenance/save';
const deleteMaintenance = 'http://localhost:8080/api/maintenance/delete/';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  // va modificato per mettere l'id dell'utente
  getAllMaintenaceByUser(): Observable<Maintenance[]> {

    return this.http.get<Maintenance[]>(getAllMaintenanceByUser + '1');
  }

  getAllMaintenance(): Observable<Maintenance[]>{
    return this.http.get<Maintenance[]>(getAllMaintenance);
  }

  getMaintenanceById(id: string): Observable<Maintenance>{
  return this.http.get<Maintenance>(getMaintenanceById + id);
  }

  saveMaintenance(maintenance: Maintenance): Observable<Maintenance> {
    return this.http.post<Maintenance>(saveMaintenance, maintenance, httpOptions);
  }

  deleteMaintenance(id: string): Observable<Maintenance> {
    return this.http.delete<Maintenance>(deleteMaintenance + id);
  }
}
