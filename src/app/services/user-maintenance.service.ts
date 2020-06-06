import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserMaintenance} from '../models/user-maintenance';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const getAllUM = 'http://localhost:8080/api/user/maintenace/getAll';
const getUMById = 'http://localhost:8080/api/user/maintenace/getById/';
const saveUM = 'http://localhost:8080/api//user/maintenace/save';
const deleteUM = 'http://localhost:8080/api/user/maintenace/delete/';

@Injectable({
  providedIn: 'root'
})
export class UserMaintenanceService {

  constructor(private http: HttpClient) { }

  getAllUM(): Observable<UserMaintenance[]> {
    return this.http.get<UserMaintenance[]>(getAllUM);
  }

  getUMById(id: string): Observable<UserMaintenance> {
    return this.http.get<UserMaintenance>(getUMById + id);
  }

  saveUM(userMaintenance: UserMaintenance): Observable<UserMaintenance> {
    return this.http.post<UserMaintenance>(saveUM, userMaintenance, httpOptions);
  }

  deleteUM(id: string): Observable<UserMaintenance> {
    return this.http.delete<UserMaintenance>(deleteUM + id);
  }
}
