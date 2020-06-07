import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Maintenance } from '../models/maintenance';
import { Observable } from 'rxjs';
import { ApiVariables } from '../common/ApiVariables';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private getAllMaintenanceByUserUrl = ApiVariables.apiUrlMaintenance + '/getMaintenaceFromUser/';
  private getAllMaintenanceUrl = ApiVariables.apiUrlMaintenance + '/getAll';
  private getMaintenanceByIdUrl = ApiVariables.apiUrlMaintenance + '/getById/';
  private saveMaintenanceUrl = ApiVariables.apiUrlMaintenance + '/save';
  private deleteMaintenanceUrl = ApiVariables.apiUrlMaintenance + '/delete/';

  constructor(private http: HttpClient) { }

  // TODO: va modificato per mettere l'id dell'utente
  getAllMaintenaceByUser(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.getAllMaintenanceByUserUrl + '1');
  }

  getAllMaintenance(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.getAllMaintenanceUrl);
  }

  getMaintenanceById(id: string): Observable<Maintenance> {
    return this.http.get<Maintenance>(this.getMaintenanceByIdUrl + id);
  }

  saveMaintenance(maintenance: Maintenance): Observable<Maintenance> {
    return this.http.post<Maintenance>(this.saveMaintenanceUrl, maintenance, httpOptions);
  }

  deleteMaintenance(id: string): Observable<Maintenance> {
    return this.http.delete<Maintenance>(this.deleteMaintenanceUrl + id);
  }
}
