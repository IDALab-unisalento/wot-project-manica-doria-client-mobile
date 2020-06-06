import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Zone} from '../models/zone';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const getAllZone = 'http://localhost:8080/api/zone/getAll';
const getZoneById = 'http://localhost:8080/api/zone/getById/';
const saveZone = 'http://localhost:8080/api/zone/save';
const deleteZone = 'http://localhost:8080/api/zone/delete/';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http: HttpClient) { }

  getAllZone(): Observable<Zone[]> {
    return this.http.get<Zone[]>(getAllZone);
  }

  getZoneById(id: string): Observable<Zone> {
    return this.http.get<Zone>(getZoneById + id);
  }

  saveZone(zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(saveZone, zone, httpOptions);
  }

  deleteZone(id: string): Observable<Zone> {
    return this.http.delete<Zone>(deleteZone + id);
  }
}
