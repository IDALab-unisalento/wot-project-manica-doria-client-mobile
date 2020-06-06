import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Beacon} from '../models/beacon';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const getAllBeacon = 'http://localhost:8080/api/beacon/getAll';
const getBeaconById = 'http://localhost:8080/api/beacon/getById/';
const saveBeacon = 'http://localhost:8080/api/beacon/save';
const deleteBeacon = 'http://localhost:8080/api/beacon/delete/';

@Injectable({
  providedIn: 'root'
})
export class BeaconService {

  constructor(private http: HttpClient) { }

  getAllBeacon(): Observable<Beacon[]> {
    return this.http.get<Beacon[]>(getAllBeacon);
  }

  getBeaconById(id: string): Observable<Beacon> {
    return this.http.get<Beacon>(getBeaconById + id);
  }

  saveBeacon(beacon: Beacon): Observable<Beacon> {
    return this.http.post<Beacon>(saveBeacon, beacon, httpOptions);
  }

  deleteBeacon(id: string): Observable<Beacon> {
    return this.http.delete<Beacon>(deleteBeacon + id);
  }
}
