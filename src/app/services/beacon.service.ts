import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beacon } from '../models/beacon';
import { ApiVariables } from '../common/ApiVariables';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BeaconService {

  private getAllBeaconUrl = ApiVariables.apiUrlBeacon + '/getAll';
  private getBeaconByIdUrl = ApiVariables.apiUrlBeacon + '/getById/';
  private saveBeaconUrl = ApiVariables.apiUrlBeacon + '/save';
  private deleteBeaconUrl = ApiVariables.apiUrlBeacon + '/delete/';

  constructor(private http: HttpClient) { }

  getAllBeacon(): Observable<Beacon[]> {
    return this.http.get<Beacon[]>(this.getAllBeaconUrl);
  }

  getBeaconById(id: string): Observable<Beacon> {
    return this.http.get<Beacon>(this.getBeaconByIdUrl + id);
  }

  saveBeacon(beacon: Beacon): Observable<Beacon> {
    return this.http.post<Beacon>(this.saveBeaconUrl, beacon, httpOptions);
  }

  deleteBeacon(id: string): Observable<Beacon> {
    return this.http.delete<Beacon>(this.deleteBeaconUrl + id);
  }
}
