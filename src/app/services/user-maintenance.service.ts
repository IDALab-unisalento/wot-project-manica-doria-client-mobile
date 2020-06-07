import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserMaintenance } from '../models/user-maintenance';
import { ApiVariables } from '../common/ApiVariables';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserMaintenanceService {

  private getAllUMUrl = ApiVariables.apiUrlUserMaintenance + '/getAll';
  private getUMByIdUrl = ApiVariables.apiUrlUserMaintenance + '/getById/';
  private saveUMUrl = ApiVariables.apiUrlUserMaintenance + '/save';
  private deleteUMUrl = ApiVariables.apiUrlUserMaintenance + '/delete/';

  constructor(private http: HttpClient) { }

  getAllUM(): Observable<UserMaintenance[]> {
    return this.http.get<UserMaintenance[]>(this.getAllUMUrl);
  }

  getUMById(id: string): Observable<UserMaintenance> {
    return this.http.get<UserMaintenance>(this.getUMByIdUrl + id);
  }

  saveUM(userMaintenance: UserMaintenance): Observable<UserMaintenance> {
    return this.http.post<UserMaintenance>(this.saveUMUrl, userMaintenance, httpOptions);
  }

  deleteUM(id: string): Observable<UserMaintenance> {
    return this.http.delete<UserMaintenance>(this.deleteUMUrl + id);
  }
}
